import moment from 'moment';

import type {
  AirportQuery,
  FullFlightFragmentFragment,
} from '@app/generated/server.gql';

export type FlightTimeStatus = 'delayed' | 'early' | 'late' | 'on-time';

type Transformed = {
  airport: Pick<AirportQuery['airport'], 'iata' | 'name'>;
  airportIata: string;
  baggageClaim?: null | string;
  dayDiff?: string;
  gate?: null | string;
  status: FlightTimeStatus;
  terminal?: null | string;
  time: moment.Moment;
  timezone: string;
};

function getStatus(
  scheduledTime: moment.MomentInput,
  actualTime: moment.MomentInput,
): FlightTimeStatus {
  const scheduled = moment(scheduledTime);
  const actual = moment(actualTime);

  if (actual.isSame(scheduled, 'minute')) {
    return 'on-time';
  } else if (actual.isBefore(scheduled, 'minute')) {
    return 'early';
  } else if (actual.isAfter(scheduled, 'hour')) {
    return 'delayed';
  } else {
    return 'late';
  }
}

export function transformFlightData(flight: FullFlightFragmentFragment): {
  destination: Transformed;
  origin: Transformed;
} {
  const originTime = moment
    .utc(flight.estimatedGateDeparture)
    .tz(flight.Origin.timezone);

  const destinationTime = moment
    .utc(flight.estimatedGateArrival)
    .tz(flight.Destination.timezone);

  const dayDiff =
    parseInt(destinationTime.format('YYYYMMDD'), 10) -
    parseInt(originTime.format('YYYYMMDD'), 10);

  const origin: Transformed = {
    airport: flight.Origin,
    airportIata: flight.originIata,
    gate: flight.originGate,
    status: getStatus(
      flight.scheduledGateDeparture,
      flight.estimatedGateDeparture,
    ),
    terminal: flight.originTerminal,
    time: originTime,
    timezone: flight.Origin.timezone,
  };

  const destination: Transformed = {
    airport: flight.Destination,
    airportIata: flight.destinationIata,
    baggageClaim: flight.destinationBaggageClaim,
    dayDiff: dayDiff > 0 ? `+${dayDiff}` : dayDiff.toString(),
    gate: flight.destinationGate,
    status: getStatus(flight.scheduledGateArrival, flight.estimatedGateArrival),
    terminal: flight.destinationTerminal,
    time: destinationTime,
    timezone: flight.Destination.timezone,
  };

  return {
    destination,
    origin,
  };
}
