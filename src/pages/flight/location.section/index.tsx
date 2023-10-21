import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import type { AirportQuery } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FaIcon } from '@app/components/icons.fontawesome';

type Props = {
  actualMovementTime?: Date | null;
  airport: Pick<AirportQuery['airport'], 'iata' | 'name'>;
  airportIata: string;
  baggageClaim?: null | string;
  estimatedMovementTime: Date;
  gate?: null | string;
  scheduledMovementTime: Date;
  terminal?: null | string;
  timezone: string;
  type: 'destination' | 'origin';
};

const FILLER = '--' as const;

export const FlightPageLocationSection: React.FC<Props> = ({
  actualMovementTime,
  airport,
  baggageClaim,
  estimatedMovementTime,
  gate,
  scheduledMovementTime,
  terminal,
  timezone,
  type,
}) => {
  const theme = useTheme();
  const usableTime = actualMovementTime || estimatedMovementTime;
  const movementTime = moment.utc(usableTime).tz(timezone);
  const gateText = gate || FILLER;
  const terminalText = terminal || FILLER;
  const baggageText = baggageClaim || FILLER;
  const timeColor = moment(usableTime).isSameOrBefore(scheduledMovementTime)
    ? theme.pallette.success
    : theme.pallette.warn;

  const icon =
    type === 'origin' ? 'circle-arrow-up-right' : 'circle-arrow-down-right';

  return (
    <Container>
      <Airport>
        <AirportIata>{airport.iata}</AirportIata>
        <AirportName>{airport.name}</AirportName>
      </Airport>
      <Meta>
        <Time>
          <DirectionalIconContainer>
            <FaIcon color={timeColor} name={icon} size={22} solid />
          </DirectionalIconContainer>
          <TimeText style={[{ color: timeColor }]}>
            {movementTime.format('h:mm A')}
          </TimeText>
        </Time>
        <View style={[{ gap: 3 }]}>
          <MetaText isFiller={!terminal}>Terminal {terminalText}</MetaText>
          <MetaText isFiller={!gate}>Gate {gateText}</MetaText>
          {type === 'destination' && (
            <MetaText isFiller={!baggageClaim}>
              Baggage Belt {baggageText}
            </MetaText>
          )}
        </View>
      </Meta>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.large,
    maxWidth: '100%',
    overflow: 'hidden',
  },
]);

const Airport = withStyled(View, () => [
  {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
  },
]);

const AirportIata = withStyled(Text, (theme) => [
  theme.typography.presets.h1,
  {
    lineHeight: 55,
  },
]);

const AirportName = withStyled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.text,
  },
]);

const Meta = withStyled(View, (theme) => [
  {
    alignItems: 'flex-end',
    gap: theme.space.tiny,
  },
]);

const MetaText = withStyled<{ isFiller?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.p2,
    {
      color: theme.pallette.text,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    props.isFiller && {
      color: theme.pallette.textSecondary,
    },
  ],
);

const Time = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

const TimeText = withStyled(Text, () => [
  {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    width: 100,
  },
]);

const DirectionalIconContainer = withStyled(View, (_) => []);
