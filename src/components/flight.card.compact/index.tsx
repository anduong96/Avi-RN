import * as React from 'react';
import { Text, View } from 'react-native';

import type { Flight } from '@app/generated/server.gql';
import type { FindFlightsQuery } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { transformFlightData } from '@app/lib/transformers/transform.flight.data';

import { FaIcon } from '../icons.fontawesome';
import { DividerDashed } from '../divider.dashed';

type Props = {
  flight: FindFlightsQuery['flights'][number];
};

export const FlightCardCompact: React.FC<Props> = ({ flight }) => {
  const theme = useTheme();
  const data = transformFlightData(flight);
  const departure = data.origin.time;
  const statusColor =
    data.origin.status === 'early' || data.origin.status === 'on-time'
      ? theme.pallette.success
      : data.origin.status === 'delayed'
      ? theme.pallette.warn
      : theme.pallette.danger;

  return (
    <Container>
      <Main>
        <FlightPoint type="origin">
          <AirportIata>{flight.Origin.iata}</AirportIata>
          <AirportCity>{flight.Origin.cityName}</AirportCity>
        </FlightPoint>
        <DividerContainer>
          <DividerDashed />
          <ActiveDivider progressPercent={flight.progressPercent} />
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
              color={statusColor}
              name="circle-arrow-up-right"
              size={20}
              solid
            />
          </MovementIconContainer>
          <MovementText color={statusColor}>
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

const Container = withStyled(View, (theme) => [
  theme.presets.shadows[200],
  {
    backgroundColor: theme.pallette.card,
    borderRadius: theme.borderRadius,
    gap: theme.space.medium,
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.medium,
  },
]);

const Main = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
    overflow: 'hidden',
  },
]);

const Footer = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.medium,
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

const Actions = withStyled(View, () => [
  {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-end',
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

const DividerContainer = withStyled(View, (theme) => [
  {
    flexGrow: 1,
    overflow: 'hidden',
    paddingTop: theme.typography.presets.h1.fontSize / 2,
  },
]);

const Movement = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

const MovementIconContainer = withStyled(View, () => [{}]);

const ActiveDivider = withStyled<Pick<Flight, 'progressPercent'>, typeof View>(
  View,
  (theme, props) => [
    {
      alignSelf: 'center',
      backgroundColor: theme.pallette.active,
      height: 1,
      position: 'absolute',
    },
    {
      left: 0,
      width: `${props.progressPercent * 100}%`,
    },
  ],
);
