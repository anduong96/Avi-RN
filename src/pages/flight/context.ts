import * as React from 'react';

import type { Flight, FlightQuery } from '@app/generated/server.gql';

type FlightContextType = {
  flight: FlightQuery['flight'];
  flightID: Flight['id'];
  lastRefreshed: Date;
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

export function useFlightLastRefreshed() {
  return React.useContext(FlightContext).lastRefreshed;
}
