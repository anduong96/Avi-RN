import * as React from 'react';

import Fuse from 'fuse.js';
import moment from 'moment';
import { concat } from 'lodash';

import { useAirlinesQuery, useAirportsQuery } from '@app/generated/server.gql';

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

export enum TextSearchItemType {
  AIRLINE,
  AIRPORT,
}

export function useTextSearch(searchValue: string, flightNumber?: string) {
  const airports = useAirportsQuery({
    fetchPolicy: 'cache-first',
    pollInterval: moment.duration({ days: 1 }).asMilliseconds(),
  });
  const airlines = useAirlinesQuery({
    fetchPolicy: 'cache-first',
    pollInterval: moment.duration({ days: 1 }).asMilliseconds(),
  });

  const searcher = React.useMemo(
    () =>
      new Fuse(
        concat(
          [],
          airlines.data?.airlines.map((airline) => ({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: airline as any,
            iata: airline.iata,
            tags: [airline.iata, airline.name],
            type: TextSearchItemType.AIRLINE,
          })),
          airports.data?.airports.map((airport) => ({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: airport as any,
            iata: airport.iata,
            tags: [
              airport.cityName,
              airport.cityCode,
              airport.iata,
              airport.state,
              airport.name,
            ],
            type: TextSearchItemType.AIRPORT,
          })),
        ),
        {
          includeMatches: true,
          includeScore: true,
          keys: ['tags'],
          minMatchCharLength: 2,
          shouldSort: true,
        },
      ),
    [airlines.data, airports.data],
  );

  const result = React.useMemo(
    () =>
      searchValue.length >= 2
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
