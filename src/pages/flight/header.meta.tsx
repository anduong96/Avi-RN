import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';
import tinycolor from 'tinycolor2';

import { withStyled } from '@app/lib/styled';
import { DOT_SEPARATOR } from '@app/constants';
import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';
import { type Flight, useGetFlightQuery } from '@app/generated/server.gql';

type Props = {
  flightID: Flight['id'];
};

export const HeaderMeta: React.FC<Props> = ({ flightID }) => {
  const request = useGetFlightQuery({ variables: { flightID } });
  const flight = request.data?.flight;
  if (!flight) {
    return null;
  }

  return (
    <Container>
      <Airline>
        <AirlineName>{flight.Airline.name}</AirlineName>
      </Airline>
      <Ticket>
        <AirlineLogo airlineIata={flight.airlineIata} />
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
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    backgroundColor: tinycolor(theme.pallette.background)
      .setAlpha(0.9)
      .toRgbString(),
    justifyContent: 'center',
    marginBottom: theme.space.small,
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.medium,
  },
]);

const FlightNumber = withStyled(View, () => [
  {
    flexDirection: 'row',
    gap: 2,
  },
]);

const Ticket = withStyled(View, () => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
]);

const Airline = withStyled(View, () => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
]);

const FlightText = withStyled(Text, (theme) => [
  theme.typography.presets.h2,
  {
    color: theme.pallette.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
]);

const AirlineName = withStyled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.textSecondary,
    lineHeight: undefined,
    textAlign: 'center',
  },
]);

const AirlineLogo = withStyled(
  AirlineLogoAvatar,
  () => [
    {
      marginRight: 5,
    },
  ],
  (theme) => ({
    size: theme.typography.presets.h2.fontSize + 10,
  }),
);
