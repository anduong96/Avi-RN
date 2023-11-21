import * as React from 'react';
import { ScrollView, Text } from 'react-native';

import { inRange, isEmpty } from 'lodash';

import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { getAdjustedDepartureTime } from '@app/lib/flight/get.adjusted.flight.time';

import { Bar } from './bar';
import { useFlight } from '../context';
import { useAirportTsaWait } from '../hooks/use.airport.tsa.wait';

export const TsaCard: React.FC = () => {
  const theme = useTheme();
  const waitTimes = useAirportTsaWait();
  const content = React.useRef<ScrollView>(null);
  const flight = useFlight();
  const departureTime = getAdjustedDepartureTime(flight);
  const departureHour = departureTime.hour();
  const minShowingHour = departureHour - 3;
  const maxShowingHour = departureHour + 3;
  const displayTimes = waitTimes ?? [];
  const highestMaxWaitMinute = Math.max(
    ...displayTimes.map((entry) => entry.maxWaitMinute),
  );

  React.useEffect(() => {
    const indexToShow = Math.max(0, minShowingHour - 1);
    content.current?.scrollTo({
      animated: false,
      x: indexToShow * 40 + theme.space.tiny * indexToShow,
    });
  }, [minShowingHour, theme]);

  if (isEmpty(displayTimes)) {
    return null;
  }

  return (
    <Card gap="large">
      <Title>Average TSA Wait Time</Title>
      <Content ref={content}>
        {displayTimes.map((entry) => (
          <Bar
            columnHeight={(entry.maxWaitMinute / highestMaxWaitMinute) * 100}
            isActive={inRange(entry.hour, minShowingHour, maxShowingHour)}
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
  {
    color: theme.pallette.textSecondary,
  },
]);

const Content = withStyled(ScrollView, undefined, (theme) => ({
  contentContainerStyle: {
    gap: theme.space.tiny,
  },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}));
