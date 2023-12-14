import auth from '@react-native-firebase/auth';
import { onError } from '@apollo/client/link/error';
import { persistCache } from 'apollo3-cache-persist';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { ENV } from '@app/env';
import { logger } from '@app/lib/logger';
import { Analytics } from '@app/lib/analytics';
import { getApolloStorage } from '@app/lib/storage';

const gqlLogger = logger.getSubLogger('Apollo GraphQL');
const SERVER_URL = `${ENV.SERVER}/graphql`;

gqlLogger.debug({ IS_DEV: ENV.IS_DEV, SERVER_URL });

const httpLink = createHttpLink({ uri: SERVER_URL });
const authLink = setContext(async (_, { headers }) => {
  const token = await auth().currentUser?.getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  gqlLogger.debug({ graphQLErrors, networkError, operation });

  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      Analytics.error(error);
      gqlLogger.error(
        `Unexpected Error from ${operation.operationName}`,
        error,
      );
    });
  }

  if (networkError) {
    Analytics.error(networkError);
    gqlLogger.error('Network error', networkError);
  }
});

const cache = new InMemoryCache();
const storage = getApolloStorage();

persistCache({
  cache,
  key: SERVER_URL,
  storage,
});

export const AppServerApolloClient = new ApolloClient({
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: ENV.IS_DEV ? 'cache-and-network' : 'cache-first',
      pollInterval: 10 * 1000 * 60,
    },
  },
  link: ApolloLink.from([errorLink, authLink, httpLink]),
});
