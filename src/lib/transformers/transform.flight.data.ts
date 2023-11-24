import * as React from 'react';

import moment from 'moment';

import type {
  AirportQuery,
  FullFlightFragmentFragment,
} from '@app/generated/server.gql';

import { useTheme } from '../hooks/use.theme';

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
  } else if (actual.diff(scheduled, 'minute') < 20) {
    return 'delayed';
  } else {
    return 'late';
  }
}

/**
 * The function `useFlightStatusColor` returns a color based on the flight status provided.
 * @param {FlightTimeStatus} status - The `status` parameter is of type `FlightTimeStatus`, which is a
 * custom type representing the status of a flight. It can have the following values:
 * @returns the color value based on the flight status.
 */
export function useFlightStatusColor(status?: FlightTimeStatus) {
  const theme = useTheme();
  const [color, setColor] = React.useState<string>();

  React.useEffect(() => {
    setColor(
      status === 'early' || status === 'on-time'
        ? theme.pallette.success
        : status === 'delayed'
          ? theme.pallette.warn
          : status === 'late'
            ? theme.pallette.danger
            : undefined,
    );
  }, [theme, status]);

  return color;
}

export function transformFlightData(flight: FullFlightFragmentFragment): {
  destination: Transformed;
  origin: Transformed;
} {
  const originTime = moment(flight.estimatedGateDeparture).utcOffset(
    flight.originUtcHourOffset,
  );

  const destinationTime = moment(flight.estimatedGateArrival).utcOffset(
    flight.Destination.timezone,
  );

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
    dayDiff:
      dayDiff > 0
        ? `+${dayDiff}`
        : dayDiff === 0
          ? undefined
          : dayDiff.toString(),
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
