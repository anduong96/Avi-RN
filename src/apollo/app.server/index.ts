import moment from 'moment';
import { onError } from '@apollo/client/link/error';
import { persistCache } from 'apollo3-cache-persist';
import { setContext } from '@apollo/client/link/context';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { ENV } from '@app/env';
import { createLogger } from '@app/lib/logger';
import { Analytics } from '@app/lib/analytics';
import { getApolloStorage } from '@app/lib/storage';
import { getAuthToken } from '@app/lib/get.auth.token';

const logger = createLogger('Apollo GraphQL');
const SERVER_URL = `${ENV.SERVER}/graphql`;

logger.debug({
  IS_DEV: ENV.IS_DEV,
  SERVER_URL,
});

if (ENV.IS_DEV) {
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = createHttpLink({
  uri: SERVER_URL,
});

const authLink = setContext(async (op, { headers }) => {
  const token = await getAuthToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const errorLink = onError(
  ({ forward, graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        Analytics.error(error);
        logger.error(`Unexpected Error from ${operation.operationName}`, error);
      });

      return forward(operation);
    }

    if (networkError) {
      Analytics.error(networkError);
      logger.error('Network error', networkError);
    }
  },
);

const cache = new InMemoryCache();

if (__DEV__) {
  persistCache({
    cache,
    key: SERVER_URL,
    storage: getApolloStorage(),
  });
}

export const AppServerApolloClient = new ApolloClient({
  cache,
  defaultOptions: {
    watchQuery: {
      pollInterval: moment.duration({ minute: 2 }).as('ms'),
    },
  },
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  ssrForceFetchDelay: 100,
  ssrMode: false,
  uri: SERVER_URL,
});
