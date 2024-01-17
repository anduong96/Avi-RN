import moment from 'moment';
import { persistCache } from 'apollo3-cache-persist';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { ENV } from '@app/env';
import { getApolloStorage } from '@app/lib/storage';

const URL =
  'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clq5vbkc727ot01um853p7kfo/master';

const httpLink = createHttpLink({ uri: URL });
const cache = new InMemoryCache();
const storage = getApolloStorage();

persistCache({
  cache,
  key: URL,
  storage,
});

export const CmsServerApolloClient = new ApolloClient({
  cache,
  defaultOptions: {
    watchQuery: {
      initialFetchPolicy: ENV.IS_DEV ? 'network-only' : 'cache-first',
      pollInterval: moment.duration({ day: 1 }).as('ms'),
    },
  },
  link: ApolloLink.from([httpLink]),
});
