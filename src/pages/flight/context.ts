import * as React from 'react';

import type { Flight, FlightQuery } from '@app/generated/server.gql';

type FlightContextType = {
  flight: FlightQuery['flight'];
  flightID: Flight['id'];
};

export const FlightContext = React.createContext<FlightContextType>(
  {} as unknown as FlightContextType,
);

export function useFlightID() {
  return React.useContext(FlightContext).flightID;
}

export function useFlight() {
  return React.useContext(FlightContext).flight;
}
