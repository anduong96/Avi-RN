import { useAirportTsaWaitTimeQuery } from '@app/generated/server.gql';
import { getAdjustedDepartureTime } from '@app/lib/flight/get.adjusted.flight.time';

import { useFlight } from '../context';

export function useAirportTsaWait() {
  const flight = useFlight();
  const airportIata = flight.originIata;
  const departureTime = getAdjustedDepartureTime(flight);
  const request = useAirportTsaWaitTimeQuery({
    variables: {
      airportIata,
    },
  });

  const waitTime = request.data?.airportTsaWaitTime;
  if (!waitTime) {
    return;
  }

  return waitTime.filter(
    (entry) => entry.dayOfWeek === departureTime.weekday(),
  );
}
