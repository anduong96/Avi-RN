import * as React from 'react';
import { useAirlinesQuery } from '@app/generated/server.gql';
import Fuse from 'fuse.js';
import moment from 'moment';

/**
 * The `useAirlineSearch` function is a TypeScript function that uses the Fuse library to search for
 * airlines based on a search value and returns the top 5 matching results.
 * @param {string} searchValue - The `searchValue` parameter is a string that represents the value to
 * search for in the list of airlines. It is used to filter and find matching airlines based on their
 * IATA code or name.
 * @returns The function `useAirlineSearch` returns an array of search results based on the
 * `searchValue` parameter. The search results are obtained by using the `searcher` object, which is
 * created using the `Fuse` library. The `searcher` object performs a fuzzy search on the
 * `airlines.data?.airlines` array, using the `iata` and `name` keys
 */
export function useAirlineSearch(searchValue: string) {
  const airlines = useAirlinesQuery({
    fetchPolicy: 'cache-and-network',
    pollInterval: moment.duration({ days: 1 }).asMilliseconds(),
  });
  const searcher = React.useMemo(
    () =>
      new Fuse(airlines.data?.airlines ?? [], {
        keys: ['iata', 'name'],
        shouldSort: true,
        minMatchCharLength: 2,
        includeMatches: true,
        includeScore: true,
      }),
    [airlines.data],
  );
  const result = React.useMemo(
    () => (searchValue ? searcher.search(searchValue).slice(0, 5) : []),
    [searchValue, searcher],
  );

  return result;
}
