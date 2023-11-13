import * as React from 'react';
import { Text, View } from 'react-native';

import { inRange } from 'lodash';

import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { FlightStatus } from '@app/generated/server.gql';
import { getAdjustedDepartureTime } from '@app/lib/flight/get.adjusted.flight.time';

import { Bar } from './bar';
import { useFlight } from '../context';
import { useAirportTsaWait } from '../hooks/use.airport.tsa.wait';

export const TsaCard: React.FC = () => {
  const waitTimes = useAirportTsaWait();
  const flight = useFlight();
  const departureTime = getAdjustedDepartureTime(flight);
  const departureHour = departureTime.hour();
  const maxShowingHour = departureHour + 3;
  const minShowingHour = departureHour - 3;
  const displayTimes = waitTimes?.filter((entry) =>
    inRange(entry.hour, minShowingHour, maxShowingHour),
  );

  if (!displayTimes || flight.status !== FlightStatus.SCHEDULED) {
    return null;
  }

  const highestMaxWaitMinute = Math.max(
    ...displayTimes.map((entry) => entry.maxWaitMinute),
  );

  return (
    <Card gap="large">
      <Title>Average TSA Wait Time</Title>
      <Content>
        {displayTimes.map((entry) => (
          <Bar
            columnHeight={(entry.maxWaitMinute / highestMaxWaitMinute) * 100}
            isActive={entry.hour === departureHour}
            key={entry.hour}
            value={entry}
          />
        ))}
      </Content>
    </Card>
  );
};

const Title = withStyled(Text, (theme) => [
  theme.typography.presets.p2,
  { color: theme.pallette.textSecondary },
]);

const Content = withStyled(View, (theme) => [
  {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);
