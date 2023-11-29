import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Flight } from '@app/generated/server.gql';
import type { FindFlightsQuery } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { transformFlightData } from '@app/lib/transformers/transform.flight.data';

import type { ShadowProps } from '../shadow';

import { Shadow } from '../shadow';
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
    <ShadowWrapper>
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
            <FaIcon
              color={theme.pallette.active}
              name="arrow-right"
              size={20}
            />
          </Actions>
        </Footer>
      </Container>
    </ShadowWrapper>
  );
};

const ShadowWrapper = withStyled(
  Shadow,
  (theme) => [
    {
      borderRadius: theme.borderRadius,
    },
  ],
  (theme): ShadowProps => ({
    disabled: theme.isDark,
    distance: 1,
    level: 2,
  }),
);

const Container = withStyled(View, (theme) => [
  {
    backgroundColor: theme.pallette.card,
    borderRadius: theme.borderRadius,
    gap: theme.space.medium,
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.medium,
  },
  !theme.isDark && [
    {
      backgroundColor: theme.pallette.background,
      borderColor: theme.pallette.borderColor,
      borderStyle: 'solid',
      borderWidth: StyleSheet.hairlineWidth,
    },
  ],
]);

const Main = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
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

const AirportIata = withStyled(Text, (theme) => [
  theme.typography.presets.h1,
  {
    color: theme.pallette.text,
  },
]);

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
    top: theme.typography.presets.h1.fontSize / 2,
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
