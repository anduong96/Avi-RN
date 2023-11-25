import moment from 'moment-timezone';

import type { Flight } from '@app/generated/server.gql';

export function getAdjustedDepartureTime(
  flight: Pick<Flight, 'estimatedGateDeparture' | 'originUtcHourOffset'>,
) {
  return moment(flight.estimatedGateDeparture).utcOffset(
    flight.originUtcHourOffset,
  );
}

export function getAdjustedArrivalTime(
  flight: Pick<Flight, 'destinationUtcHourOffset' | 'estimatedGateArrival'>,
) {
  return moment(flight.estimatedGateArrival).utcOffset(
    flight.destinationUtcHourOffset,
  );
}
