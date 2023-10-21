import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { DOT_SEPARATOR } from '@app/constants';
import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';

type Props = {
  flight: Pick<
    FullFlightFragmentFragment,
    | 'Airline'
    | 'Origin'
    | 'airlineIata'
    | 'estimatedGateDeparture'
    | 'flightNumber'
  >;
};

export const FlightMeta: React.FC<Props> = ({ flight }) => {
  return (
    <Container>
      <AirlineLogoAvatar airlineIata={flight.airlineIata} size={50} />
      <Airline>
        <AirlineName>{flight.Airline.name}</AirlineName>
        <Ticket>
          <FlightNumber>
            <FlightText>{flight.airlineIata}</FlightText>
            <FlightText>{flight.flightNumber}</FlightText>
          </FlightNumber>
          <FlightText>{DOT_SEPARATOR}</FlightText>
          <FlightText>
            {moment(flight.estimatedGateDeparture)
              .tz(flight.Origin.timezone)
              .format('MMM D, YYYY')}
          </FlightText>
        </Ticket>
      </Airline>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.small,
  },
]);

const FlightNumber = withStyled(View, () => [
  {
    flexDirection: 'row',
    gap: 2,
  },
]);

const FlightText = withStyled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.textSecondary,
  },
]);

const Ticket = withStyled(View, () => [
  {
    alignItems: 'center',
    flexDirection: 'row',
  },
]);

const Airline = withStyled(View, () => [
  {
    flexDirection: 'column',
    justifyContent: 'center',
  },
]);

const AirlineName = withStyled(Text, (theme) => [
  theme.typography.presets.h3,
  {
    lineHeight: undefined,
  },
]);
