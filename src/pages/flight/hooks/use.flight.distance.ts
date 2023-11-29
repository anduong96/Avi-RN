import Qty from 'js-quantities';

import { useIsAmericanSystem } from '@app/lib/hooks/use.measurement.system';

import { useFlight } from '../context';

export function useFlightDistance() {
  const flight = useFlight();
  const isAmerican = useIsAmericanSystem();
  const qty = Qty(flight.totalDistanceKm ?? 0, 'km');
  return isAmerican
    ? qty.to('mi').toPrec(1).toString()
    : qty.toPrec(1).toString();
}
