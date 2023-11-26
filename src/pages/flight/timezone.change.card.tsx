import * as React from 'react';

import pluralize from 'pluralize';
import moment from 'moment-timezone';

import { format } from '@app/lib/format';
import { Group } from '@app/components/group';
import { useMinuteRefresh } from '@app/lib/hooks/use.refresh.interval';

import { useFlight } from './context';
import {
  InnerTile,
  InnerTileLabel,
  InnerTileValue,
  SectionTile,
  TileLabel,
  TileValue,
} from './styles';

export const TimezoneChangeCard: React.FC = () => {
  useMinuteRefresh();
  const flight = useFlight();
  const { destinationUtcHourOffset, originUtcHourOffset } = flight;
  const hourChanges = originUtcHourOffset - destinationUtcHourOffset;
  const originCity = flight.Origin.cityName;
  const destinationCity = flight.Destination.cityName;

  if (!hourChanges) {
    return null;
  }

  if (hourChanges === 0) {
    return null;
  }

  return (
    <SectionTile>
      <TileLabel>Timezone Change</TileLabel>
      <Group>
        <TileValue>
          {format(
            '%s%s %s',
            hourChanges > 0 ? '+' : '-',
            Math.abs(hourChanges),
            pluralize('hours', hourChanges),
          )}
        </TileValue>
      </Group>
      <Group direction="row" gap="small">
        <InnerTile>
          <InnerTileLabel>{originCity} now</InnerTileLabel>
          <InnerTileValue>
            {moment().utcOffset(originUtcHourOffset).format('LT')}
          </InnerTileValue>
        </InnerTile>
        <InnerTile>
          <InnerTileLabel>{destinationCity} now</InnerTileLabel>
          <InnerTileValue>
            {moment().utcOffset(destinationUtcHourOffset).format('LT')}
          </InnerTileValue>
        </InnerTile>
      </Group>
    </SectionTile>
  );
};
