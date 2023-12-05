import * as React from 'react';
import { ScrollView } from 'react-native';

import { inRange, isEmpty } from 'lodash';

import { logger } from '@app/lib/logger';
import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { SpaceVertical } from '@app/components/space.vertical';
import { getAdjustedDepartureTime } from '@app/lib/flight/get.adjusted.flight.time';

import { Bar } from './bar';
import { useFlight } from '../context';
import { SectionTile, TileLabel } from '../styles';
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
    if (!content.current) {
      return;
    }

    const indexToShow = Math.max(0, minShowingHour - 1);
    logger.debug('TsaCard: indexToShow=%s', indexToShow);
    content.current?.scrollTo({
      animated: false,
      x: indexToShow * 40 + theme.space.tiny * indexToShow,
    });
  }, [minShowingHour, theme, waitTimes]);

  if (isEmpty(displayTimes)) {
    return null;
  }

  return (
    <SectionTile paddingHorizontal={0}>
      <TileLabel>Typical TSA Wait Time</TileLabel>
      <SpaceVertical size="large" />
      <SpaceVertical size="small" />
      <ScrollView
        horizontal
        ref={content}
        showsHorizontalScrollIndicator={false}
      >
        <Group direction="row" gap="tiny" paddingHorizontal={'medium'}>
          {displayTimes.map((entry) => (
            <Bar
              columnHeight={(entry.maxWaitMinute / highestMaxWaitMinute) * 100}
              isActive={inRange(entry.hour, minShowingHour, maxShowingHour)}
              key={entry.hour}
              value={entry}
            />
          ))}
        </Group>
      </ScrollView>
    </SectionTile>
  );
};
