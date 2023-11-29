import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type {
  Flight,
  UserArchivedFlightsQuery,
} from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { DOT_SEPARATOR } from '@app/constants';
import {
  transformFlightData,
  useFlightStatusColor,
} from '@app/lib/transformers/transform.flight.data';

import type { ShadowProps } from '../shadow';

import { Shadow } from '../shadow';
import { Typography } from '../typography';
import { FaIcon } from '../icons.fontawesome';
import { DividerDashed } from '../divider.dashed';
import { AirlineLogoAvatar } from '../airline.logo.avatar';

type Props = {
  value: UserArchivedFlightsQuery['userArchivedFlights'][number];
};

export const FlightCard: React.FC<Props> = ({ value: { Flight } }) => {
  const data = transformFlightData(Flight);
  const departureTime = data.origin.time;
  const departureStatusColor = useFlightStatusColor(data.origin.status);

  return (
    <ShadowWrapper>
      <Container>
        <Header>
          <AirlineContainer>
            <AirlineLogoAvatar airlineIata={Flight.airlineIata} size={25} />
            <AirlineFlightNumber>
              {Flight.airlineIata} {Flight.flightNumber}
            </AirlineFlightNumber>
          </AirlineContainer>
          <Time>
            <TimeText color="secondary" isBold>
              {departureTime.fromNow()}
            </TimeText>
            <TimeText isBold>{DOT_SEPARATOR}</TimeText>
            <TimeText>{departureTime.format('MMM D')}</TimeText>
          </Time>
        </Header>
        <Body>
          <FlightPoint type="origin">
            <AirportIata>{Flight.Origin.iata}</AirportIata>
            <AirportCity>{Flight.Origin.cityName}</AirportCity>
          </FlightPoint>
          <DividerContainer>
            <DividerDashed />
            <ActiveDivider progressPercent={Flight.progressPercent} />
          </DividerContainer>
          <FlightPoint type="destination">
            <AirportIata style={{ textAlign: 'right' }}>
              {Flight.Destination.iata}
            </AirportIata>
            <AirportCity style={{ textAlign: 'right' }}>
              {Flight.Destination.cityName}
            </AirportCity>
          </FlightPoint>
        </Body>
        <Footer>
          <Movement>
            <MovementIconContainer>
              <FaIcon
                color={departureStatusColor}
                name="circle-arrow-up-right"
                size={20}
              />
            </MovementIconContainer>
            <MovementText color={departureStatusColor}>
              {departureTime.format('LT')}
            </MovementText>
          </Movement>
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
    backgroundColor: theme.pallette.grey[50],
    borderRadius: theme.borderRadius,
    gap: theme.space.small,
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

const Header = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.medium,
    justifyContent: 'space-between',
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
    {
      flexBasis: 1,
      flexGrow: 1,
    },
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

const DividerContainer = withStyled(View, (theme) => [
  {
    alignSelf: 'center',
    borderRadius: theme.roundRadius,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingTop: theme.typography.presets.h1.fontSize / 2,
  },
]);

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

const MovementText = withStyled<{ color?: string }, typeof Text>(
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

const Time = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.tiny,
    justifyContent: 'center',
  },
]);

const TimeText = withStyled(Typography, undefined, {
  type: 'small',
});
