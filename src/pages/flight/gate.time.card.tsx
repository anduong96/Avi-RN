import * as React from 'react';

import moment from 'moment';

import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { FlightArrivalIcon } from '@app/components/icon.flight.arrival';
import { formatMillisToDuration } from '@app/lib/format.milis.to.duration';
import { FlightDepartureIcon } from '@app/components/icon.flight.departure';
import {
  transformFlightData,
  useFlightStatusColor,
} from '@app/lib/transformers/transform.flight.data';

import { useFlight } from './context';
import {
  InnerTile,
  InnerTileLabel,
  InnerTileValue,
  SectionTile,
  TileLabel,
  TileValue,
} from './styles';

type Props = {
  type: 'arrival' | 'departure';
};

export const GateTimeCard: React.FC<Props> = ({ type }) => {
  const theme = useTheme();
  const flight = useFlight();
  const flightData = transformFlightData(flight);
  const isDeparture = type === 'departure';
  const [title, status, estimatedTime, scheduledTime, utcOffset] = isDeparture
    ? [
        'Departure',
        flightData.origin.status,
        flightData.origin.time,
        flight.scheduledGateDeparture,
        flight.originUtcHourOffset,
      ]
    : [
        'Arrival',
        flightData.destination.status,
        flightData.destination.time,
        flight.scheduledGateArrival,
        flight.destinationUtcHourOffset,
      ];

  const color = useFlightStatusColor(status);
  const hasDayDiff = Boolean(!isDeparture && flightData.destination.dayDiff);
  const Icon = isDeparture ? FlightDepartureIcon : FlightArrivalIcon;
  return (
    <SectionTile>
      <TileLabel>Gate {title} Time</TileLabel>
      <Group direction="row" gap={'medium'} verticalAlign="center">
        <Icon color={color} size={theme.typography.presets.h1.fontSize} />
        <TileValue color={color} isBold type="massive">
          {estimatedTime.format('LT')}
        </TileValue>
        {hasDayDiff && (
          <Typography
            color={color}
            isBold
            style={{
              position: 'absolute',
              right: -theme.typography.presets.h1.fontSize / 2,
              top: -theme.typography.presets.h1.fontSize / 2,
            }}
            type="h1"
          >
            {flightData.destination.dayDiff}
          </Typography>
        )}
      </Group>
      {status !== 'on-time' && (
        <Group direction="row" gap={'small'}>
          <InnerTile flexBasis={1} flexGrow={1}>
            <InnerTileLabel>Original Time</InnerTileLabel>
            <InnerTileValue>
              {moment(scheduledTime).utcOffset(utcOffset).format('LT')}
            </InnerTileValue>
          </InnerTile>
          <InnerTile flexBasis={1} flexGrow={1}>
            <InnerTileLabel>Difference</InnerTileLabel>
            <InnerTileValue>
              {moment(scheduledTime).isBefore(estimatedTime) ? '+' : '-'}
              {` `}
              {formatMillisToDuration(
                Math.abs(moment(scheduledTime).diff(estimatedTime)),
              )}
            </InnerTileValue>
          </InnerTile>
        </Group>
      )}
    </SectionTile>
  );
};
