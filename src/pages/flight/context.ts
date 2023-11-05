import * as React from 'react';

import type { Flight } from '@app/generated/server.gql';

type FlightContextType = { flightID: Flight['id'] };

export const FlightContext = React.createContext<FlightContextType>(
  {} as unknown as FlightContextType,
);

export function useFlightID() {
  return React.useContext(FlightContext).flightID;
}
