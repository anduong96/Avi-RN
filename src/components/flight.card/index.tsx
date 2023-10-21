import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import type { GetUserArchivedFlightsQuery } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { DOT_SEPARATOR } from '@app/constants';
import { useTheme } from '@app/lib/hooks/use.theme';

import { FaIcon } from '../icons.fontawesome';
import { DividerDashed } from '../divider.dashed';
import { AirlineLogoAvatar } from '../airline.logo.avatar';
type Props = {
  value: GetUserArchivedFlightsQuery['userArchivedFlights'][number];
};

export const FlightCard: React.FC<Props> = ({ value: { Flight } }) => {
  const theme = useTheme();
  const departure = moment
    .utc(Flight.estimatedGateDeparture)
    .tz(Flight.Origin.timezone);

  return (
    <Container>
      <Header>
        <AirlineContainer>
          <AirlineLogoAvatar airlineIata={Flight.airlineIata} size={25} />
          <AirlineFlightNumber>
            {Flight.airlineIata} {Flight.flightNumber}
          </AirlineFlightNumber>
        </AirlineContainer>
      </Header>
      <Body>
        <FlightPoint type="origin">
          <AirportIata>{Flight.Origin.iata}</AirportIata>
          <AirportCity>{Flight.Origin.cityName}</AirportCity>
        </FlightPoint>
        <DividerContainer>
          <DividerDashed />
        </DividerContainer>
        <FlightPoint type="destination">
          <AirportIata>{Flight.Destination.iata}</AirportIata>
          <AirportCity>{Flight.Destination.cityName}</AirportCity>
        </FlightPoint>
      </Body>
      <Footer>
        <Movement>
          <MovementIconContainer>
            <FaIcon
              color={theme.pallette.success}
              name="circle-arrow-up-right"
              size={20}
              solid
            />
          </MovementIconContainer>
          <MovementText color={theme.pallette.success}>
            {departure.format('LT')}
          </MovementText>
        </Movement>
        <Time>
          <TimeText bold>{departure.fromNow()}</TimeText>
          <TimeText>{DOT_SEPARATOR}</TimeText>
          <TimeText>{departure.format('MMM D')}</TimeText>
        </Time>
      </Footer>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  theme.presets.shadows[200],
  {
    backgroundColor: theme.pallette.grey[50],
    borderRadius: theme.borderRadius,
    gap: theme.space.small,
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.small,
  },
]);

const Header = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
  },
]);

const Body = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
    overflow: 'hidden',
  },
]);

const Footer = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.medium,
    justifyContent: 'space-between',
    paddingTop: theme.space.small,
  },
]);

const FlightPoint = withStyled<{ type: 'destination' | 'origin' }, typeof View>(
  View,
  (_, props) => [
    props.type === 'destination' && {
      alignItems: 'flex-end',
    },
  ],
);

const AirportIata = withStyled(Text, (theme) => [theme.typography.presets.h1]);

const AirportCity = withStyled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.textSecondary,
  },
]);

const DividerContainer = withStyled(View, (theme) => [
  {
    flexGrow: 1,
    overflow: 'hidden',
    paddingTop: theme.typography.presets.h1.fontSize / 2,
  },
]);

const AirlineContainer = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

const AirlineFlightNumber = withStyled(Text, (theme) => [
  {
    color: theme.pallette.textSecondary,
  },
]);

const Movement = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

const MovementText = withStyled<{ color: string }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.h3,
    {
      color: props.color || theme.pallette.text,
      fontWeight: 'bold',
    },
  ],
);

const MovementIconContainer = withStyled(View, () => [{}]);

const Time = withStyled(View, () => [
  {
    flexDirection: 'row',
  },
]);

const TimeText = withStyled<{ bold?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    {
      color: theme.pallette.textSecondary,
    },
    props.bold && {
      fontWeight: 'bold',
    },
  ],
);
