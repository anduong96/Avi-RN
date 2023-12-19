import * as React from 'react';

import moment from 'moment-timezone';

import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';
import { useMinuteRefresh } from '@app/lib/hooks/use.refresh.interval';

import { useFlight } from './context';
import {
  InnerTile,
  InnerTileLabel,
  InnerTileValue,
  SectionTile,
  TileLabel,
} from './styles';

export const TimezoneChangeCard: React.FC = () => {
  useMinuteRefresh();
  const flight = useFlight();
  const { destinationUtcHourOffset, originUtcHourOffset } = flight;
  const hourChanges = destinationUtcHourOffset - originUtcHourOffset;
  const originCity = flight.Origin.cityName;
  const destinationCity = flight.Destination.cityName;
  const sign = hourChanges > 0 ? '+' : '-';

  if (!hourChanges) {
    return null;
  }

  if (hourChanges === 0) {
    return null;
  }

  return (
    <SectionTile>
      <TileLabel>Timezone Change</TileLabel>
      <Group direction="row" gap="small" verticalAlign="center">
        <Typography type="h1">{sign}</Typography>
        <Group direction="row" gap="tiny" verticalAlign="center">
          <Typography isBold type="h0">
            {Math.abs(hourChanges)}h
          </Typography>
        </Group>
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
