import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clg8hix5b1wdd01uj23zq2ql5/master',
});

export const CmsServerApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
  defaultOptions: {
    watchQuery: {
      pollInterval: 10 * 1000 * 60,
      initialFetchPolicy: 'cache-first',
    },
  },
});
