import { useMeasurementDisplay } from '@app/lib/hooks/use.measurement.display';

import { useFlight } from '../context';

export function useFlightDistance() {
  const flight = useFlight();
  const distance = useMeasurementDisplay('km', flight.totalDistanceKm);
  return distance;
}
