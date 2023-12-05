import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { withStyled } from '@app/lib/styled';
import { DOT_SEPARATOR } from '@app/constants';
import {
  type Flight,
  type UserArchivedFlightsQuery,
} from '@app/generated/server.gql';
import {
  transformFlightData,
  useFlightStatusColor,
} from '@app/lib/transformers/transform.flight.data';

import type { ShadowProps } from '../shadow';

import { Group } from '../group';
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
            <TimeText isBold>{departureTime.format('MMM D')}</TimeText>
          </Time>
        </Header>
        <Group direction="column">
          <Group direction="row" gap={'small'} verticalAlign="center">
            <Group flexBasis={2} flexGrow={1} horizontalAlign="left">
              <AirportIata textAlign="left">{Flight.Origin.iata}</AirportIata>
            </Group>
            <Group flexBasis={1} flexGrow={1}>
              <DividerDashed dashThickness={2} />
              <ActiveDivider progressPercent={Flight.progressPercent} />
            </Group>
            <Group flexBasis={2} flexGrow={1} horizontalAlign="right">
              <AirportIata textAlign="right">
                {Flight.Destination.iata}
              </AirportIata>
            </Group>
          </Group>
          <Group direction="row">
            <Group flexBasis={2} flexGrow={1} horizontalAlign="left">
              <AirportCity textAlign="left">
                {Flight.Origin.cityName}
              </AirportCity>
            </Group>
            <Group flexBasis={1} flexGrow={1} />
            <Group flexBasis={2} flexGrow={1} horizontalAlign="right">
              <AirportCity textAlign="right">
                {Flight.Destination.cityName}
              </AirportCity>
            </Group>
          </Group>
        </Group>
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

const Header = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.medium,
    justifyContent: 'space-between',
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

const AirportIata = withStyled(Typography, undefined, {
  type: 'h1',
});

const AirportCity = withStyled(Typography, undefined, {
  color: 'secondary',
  type: 'p2',
});

const ActiveDivider = withStyled<Pick<Flight, 'progressPercent'>, typeof View>(
  View,
  (theme, props) => [
    {
      alignSelf: 'center',
      backgroundColor: theme.pallette.primary,
      borderRadius: theme.roundRadius,
      height: theme.borderWidth,
      overflow: 'hidden',
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

const MovementText = withStyled<{ color?: string }, typeof Typography>(
  Typography,
  (theme, props) => [
    {
      color: props.color || theme.pallette.text,
    },
  ],
  {
    isBold: true,
    type: 'h3',
  },
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
