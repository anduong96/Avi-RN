import * as React from 'react';
import { ScrollView } from 'react-native';

import moment from 'moment';
import { inRange, isEmpty } from 'lodash';

import { logger } from '@app/lib/logger';
import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { SpaceVertical } from '@app/components/space.vertical';
import { getAdjustedDepartureTime } from '@app/lib/flight/get.adjusted.flight.time';

import { Bar } from './bar';
import { useFlight } from '../../flight/context';
import { SectionTile, TileLabel } from '../../flight/styles';
import { useAirportTsaWait } from '../../flight/hooks/use.airport.tsa.wait';

export const HistoricalTerminalWaitTimeCard: React.FC = () => {
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
      x: indexToShow * 40 + theme.space.tiny * 2 * indexToShow,
    });
  }, [minShowingHour, theme, waitTimes]);

  if (isEmpty(displayTimes)) {
    return null;
  }

  return (
    <SectionTile paddingHorizontal={0}>
      <Group paddingHorizontal={'medium'}>
        <TileLabel>Historical Wait Time</TileLabel>
      </Group>
      <SpaceVertical size="small" />
      <ScrollView
        horizontal
        ref={content}
        showsHorizontalScrollIndicator={false}
      >
        <Group direction="row" gap="small" paddingHorizontal={'medium'}>
          {displayTimes.map((entry) => (
            <Bar
              columnHeight={(entry.maxWaitMinute / highestMaxWaitMinute) * 100}
              isActive={inRange(entry.hour, minShowingHour, maxShowingHour)}
              key={entry.hour}
              label={moment().set('hour', entry.hour).format('h A')}
              value={entry.hour}
            />
          ))}
        </Group>
      </ScrollView>
    </SectionTile>
  );
};
