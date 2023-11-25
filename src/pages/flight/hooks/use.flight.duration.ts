import moment from 'moment';

import { formatDurationMs } from '@app/lib/duration/format.duration';

import { useFlight } from '../context';

export function useFlightDuration() {
  const flight = useFlight();
  const { estimatedGateArrival, estimatedGateDeparture } = flight;
  const diff = moment(estimatedGateArrival).diff(estimatedGateDeparture);
  const durationText = formatDurationMs(diff);
  return durationText;
}
