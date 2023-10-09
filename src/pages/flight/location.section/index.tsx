import * as React from 'react';

import { Text, View } from 'react-native';

import { FaIcon } from '@app/components/icons.fontawesome';
import type { AirportQuery } from '@app/generated/server.gql';
import { useTheme } from '@app/lib/hooks/use.theme';
import { styled } from '@app/lib/styled';
import moment from 'moment';

type Props = {
  airportIata: string;
  terminal?: string | null;
  gate?: string | null;
  type: 'origin' | 'destination';
  timezone: string;
  estimatedMovementTime: Date;
  scheduledMovementTime: Date;
  actualMovementTime?: Date | null;
  airport: Pick<AirportQuery['airport'], 'name' | 'iata'>;
};

export const FlightPageLocationSection: React.FC<Props> = ({
  terminal = '--',
  gate = '--',
  type,
  airport,
  timezone,
  estimatedMovementTime,
  scheduledMovementTime,
  actualMovementTime,
}) => {
  const theme = useTheme();
  const usableTime = actualMovementTime || estimatedMovementTime;
  const movementTime = moment.utc(usableTime).tz(timezone);
  const timeColor = moment(usableTime).isSameOrBefore(scheduledMovementTime)
    ? theme.pallette.successLight
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
            <FaIcon solid size={22} name={icon} color={timeColor} />
          </DirectionalIconContainer>
          <TimeText style={[{ color: timeColor }]}>
            {movementTime.format('h:mm A')}
          </TimeText>
        </Time>
        <View>
          <MetaText>Terminal {terminal || '--'}</MetaText>
          <MetaText>Gate {gate || '--'}</MetaText>
        </View>
      </Meta>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  {
    flexDirection: 'row',
    maxWidth: '100%',
    overflow: 'hidden',
    gap: theme.space.large,
  },
]);

const Airport = styled(View, () => [
  {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
  },
]);

const AirportIata = styled(Text, () => [
  {
    fontSize: 50,
    lineHeight: 55,
  },
]);

const AirportName = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.grey[700],
  },
]);

const Meta = styled(View, (theme) => [
  {
    alignItems: 'flex-end',
    gap: theme.space.tiny,
  },
]);

const MetaText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    fontWeight: 'bold',
    textAlign: 'right',
    color: theme.pallette.grey[700],
  },
]);

const Time = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
    alignItems: 'center',
  },
]);

const TimeText = styled(Text, () => [
  {
    fontWeight: 'bold',
    fontSize: 22,
    width: 100,
    textAlign: 'right',
  },
]);

const DirectionalIconContainer = styled(View, (_) => []);
