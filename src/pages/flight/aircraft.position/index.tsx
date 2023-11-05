import * as React from 'react';

import moment from 'moment';
import { isNil } from 'lodash';

import { Card } from '@app/components/card';
import {
  type Flight,
  useAircraftPositionQuery,
  useAircraftQuery,
  useGetFlightQuery,
} from '@app/generated/server.gql';

type Props = {
  flightID: Flight['id'];
};
export const AircraftPositionCard: React.FC<Props> = ({ flightID }) => {
  const flight = useGetFlightQuery({ variables: { flightID } });
  const tailNumber = flight.data?.flight.aircraftTailNumber;
  const aircraft = useAircraftQuery({
    skip: isNil(tailNumber),
    variables: { tailNumber: tailNumber! },
  });
  const aircraftID = aircraft.data?.aircraft?.id;
  const aircraftPosition = useAircraftPositionQuery({
    pollInterval: moment.duration({ minutes: 5 }).milliseconds(),
    skip: isNil(aircraftID),
    variables: { aircraftID: aircraftID! },
  });

  return <Card isLoading={aircraftPosition.loading}></Card>;
};
