import * as React from 'react';

import Fuse from 'fuse.js';
import moment from 'moment';

import { useAirlinesQuery } from '@app/generated/server.gql';

/**
 * The `useAirlineSearch` function is a TypeScript function that performs a search for airlines based
 * on a search value and an optional flight number.
 * @param {string} searchValue - The search value is a string that represents the input value for
 * searching airlines. It is used to filter and find matching airlines based on their IATA code or
 * name.
 * @param {string} [flightNumber] - The `flightNumber` parameter is an optional parameter that
 * represents the flight number. It is used to filter the search results by removing the flight number
 * from the search value before performing the search.
 * @returns The function `useAirlineSearch` returns an object with two properties: `value` and
 * `loading`. The `value` property contains an array of search results based on the `searchValue` and
 * `flightNumber` parameters. The `loading` property indicates whether the airlines data is currently
 * being loaded.
 */

export function useAirlineSearch(searchValue: string, flightNumber?: string) {
  const airlines = useAirlinesQuery({
    fetchPolicy: 'cache-first',
    pollInterval: moment.duration({ days: 1 }).asMilliseconds(),
  });

  const searcher = React.useMemo(
    () =>
      new Fuse(airlines.data?.airlines ?? [], {
        includeMatches: true,
        includeScore: true,
        keys: ['iata', 'name'],
        minMatchCharLength: 2,
        shouldSort: true,
      }),
    [airlines.data],
  );
  const result = React.useMemo(
    () =>
      searchValue
        ? searcher
            .search(searchValue.replace(flightNumber || '', ''))
            .slice(0, 5)
        : [],
    [searchValue, searcher, flightNumber],
  );

  return {
    loading: airlines.loading,
    value: result,
  };
}
