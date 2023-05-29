import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { MMKVStorageWrapper, persistCache } from 'apollo3-cache-persist';

import { Analytics } from '@app/lib/analytics';
import { ENV } from '@app/env';
import { firebase } from '@react-native-firebase/auth';
import { logger } from '@app/lib/logger';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { storage } from '@app/lib/storage';

const gqlLogger = logger.extend('[Apollo GraphQL]');
const httpLink = createHttpLink({ uri: `${ENV.SERVER}/graphql` });
const authLink = setContext(async (_, { headers }) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      Analytics.error(error);
      gqlLogger.error('Unexpected Error', error);
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
  storage: new MMKVStorageWrapper(storage as any),
});

export const NestServerApolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      pollInterval: 10 * 1000 * 60,
      fetchPolicy:
        ENV.APP_ENV === 'production' ? 'cache-and-network' : 'network-only',
    },
  },
});
