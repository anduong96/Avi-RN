import {
  useAircraftPositionQuery,
  useAircraftQuery,
} from '@app/generated/server.gql';

import { useFlight } from '../context';

export function useAircraftPosition() {
  const flight = useFlight();
  const aircraft = useAircraftQuery({
    skip: !flight.aircraftTailNumber,
    variables: {
      tailNumber: flight.aircraftTailNumber!,
    },
  });
  const aircraftID = aircraft.data?.aircraft?.id;
  return useAircraftPositionQuery({
    skip: !aircraftID,
    variables: {
      aircraftID: aircraftID!,
    },
  });
}
