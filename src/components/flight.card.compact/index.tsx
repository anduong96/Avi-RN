import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import type { FindFlightsQuery } from '@app/generated/server.gql';

import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { FaIcon } from '../icons.fontawesome';
import { DividerDashed } from '../divider.dashed';
type Props = {
  flight: FindFlightsQuery['flights'][number];
};

export const FlightCardCompact: React.FC<Props> = ({ flight }) => {
  const theme = useTheme();
  const departure = moment
    .utc(flight.estimatedGateDeparture)
    .tz(flight.Origin.timezone);

  return (
    <Container>
      <Main>
        <FlightPoint type="origin">
          <AirportIata>{flight.Origin.iata}</AirportIata>
          <AirportCity>{flight.Origin.cityName}</AirportCity>
        </FlightPoint>
        <DividerContainer>
          <DividerDashed />
        </DividerContainer>
        <FlightPoint type="destination">
          <AirportIata>{flight.Destination.iata}</AirportIata>
          <AirportCity>{flight.Destination.cityName}</AirportCity>
        </FlightPoint>
      </Main>
      <Footer>
        <Movement>
          <MovementIconContainer>
            <FaIcon
              color={theme.pallette.successLight}
              name="circle-arrow-up-right"
              size={20}
              solid
            />
          </MovementIconContainer>
          <MovementText color={theme.pallette.successLight}>
            {departure.format('LT')}
          </MovementText>
        </Movement>
        <Actions>
          <FaIcon color={theme.pallette.active} name="arrow-right" size={30} />
        </Actions>
      </Footer>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  theme.presets.shadows[200],
  {
    backgroundColor: theme.pallette.card,
    borderRadius: theme.borderRadius,
    gap: theme.space.medium,
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.medium,
  },
]);

const Main = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
    overflow: 'hidden',
  },
]);

const Footer = styled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.medium,
  },
]);

const FlightPoint = styled<{ type: 'destination' | 'origin' }, typeof View>(
  View,
  (_, props) => [
    props.type === 'destination' && {
      alignItems: 'flex-end',
    },
  ],
);

const AirportIata = styled(Text, (theme) => [theme.typography.presets.h1]);

const AirportCity = styled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.textSecondary,
  },
]);

const Actions = styled(View, () => [
  {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
]);

const MovementText = styled<{ color: string }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.h3,
    {
      color: props.color || theme.pallette.text,
      fontWeight: 'bold',
    },
  ],
);

const DividerContainer = styled(View, (theme) => [
  {
    flexGrow: 1,
    overflow: 'hidden',
    paddingTop: theme.typography.presets.h1.fontSize / 2,
  },
]);

const Movement = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

const MovementIconContainer = styled(View, () => [{}]);
