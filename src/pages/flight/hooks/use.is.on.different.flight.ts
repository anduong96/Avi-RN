import { useFlight } from '../context';
import { useAircraftPosition } from './use.aircraft.position';

export function useIsOnDifferentFlight() {
  const aircraft = useAircraftPosition();
  const flight = useFlight();
  const position = aircraft.data?.aircraftPosition;
  return (
    position &&
    position.destinationIata !== flight.Destination.iata &&
    position.originIata !== flight.Origin.iata
  );
}
