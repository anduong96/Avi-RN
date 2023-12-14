import auth from '@react-native-firebase/auth';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { MMKVStorageWrapper, persistCache } from 'apollo3-cache-persist';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { ENV } from '@app/env';
import { logger } from '@app/lib/logger';
import { storage } from '@app/lib/storage';
import { Analytics } from '@app/lib/analytics';

const gqlLogger = logger.getSubLogger('Apollo GraphQL');
const SERVER_URL = `${ENV.SERVER}/graphql`;
gqlLogger.debug({ SERVER_URL });

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

persistCache({
  cache,
  storage: new MMKVStorageWrapper({
    getItem: async (key) => storage.getString(key),
    removeItem: async (key): Promise<undefined> => {
      storage.delete(key);
    },
    setItem: async (key, value): Promise<undefined> => {
      storage.set(key, value);
    },
  }),
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
