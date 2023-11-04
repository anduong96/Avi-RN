import * as React from 'react';

import type { GetFlightQuery } from '@app/generated/server.gql';

import { useGetFlightQuery } from '@app/generated/server.gql';

import { FlightContext } from '../context';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useFlight<T extends boolean>(_realized?: T) {
  type Result = T extends true ? GetFlightQuery['flight'] : undefined;
  const context = React.useContext(FlightContext);
  const flightID = context.flightID;
  const request = useGetFlightQuery({ variables: { flightID } });
  return request.data?.flight as Result;
}
