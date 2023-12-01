import * as React from 'react';

import { FILLER } from '@app/constants';
import { format } from '@app/lib/format';
import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';
import { SpaceVertical } from '@app/components/space.vertical';
import { FlightArrivalIcon } from '@app/components/icon.flight.arrival';
import { FlightDepartureIcon } from '@app/components/icon.flight.departure';
import {
  transformFlightData,
  useFlightStatusColor,
} from '@app/lib/transformers/transform.flight.data';

import { useFlight } from '../context';

type Props = {
  type: 'arrival' | 'departure';
};

export const Point: React.FC<Props> = ({ type }) => {
  const flight = useFlight();
  const isDeparture = type === 'departure';
  const data = transformFlightData(flight);
  const [iata, terminal, gate, time, status] = isDeparture
    ? [
        flight.Origin.iata,
        flight.originTerminal,
        flight.originGate,
        data.origin.time,
        data.origin.status,
      ]
    : [
        flight.Destination.iata,
        flight.destinationTerminal,
        flight.destinationGate,
        data.destination.time,
        data.destination.status,
      ];

  const color = useFlightStatusColor(status);
  const Icon = isDeparture ? FlightDepartureIcon : FlightArrivalIcon;
  const alignment = isDeparture ? 'left' : 'right';
  const hasDayDiff = Boolean(!isDeparture && data.destination.dayDiff);
  const parts = [
    ['Terminal %s', terminal],
    ['Gate %s', gate],
  ] as const;

  return (
    <Group flexBasis={1} flexGrow={1} horizontalAlign={alignment}>
      <Typography type="massive">{iata}</Typography>
      <Group direction="row">
        {parts.map(([template, value], index) => (
          <Typography
            color="secondary"
            isBold
            key={template}
            textAlign={alignment}
            type="small"
          >
            {index !== 0 && ', '}
            {format(template, value ?? FILLER)}
          </Typography>
        ))}
      </Group>
      <SpaceVertical />
      <Group
        direction="row"
        gap={'small'}
        isCentered
        style={[
          hasDayDiff && {
            paddingRight: 0,
          },
        ]}
      >
        <Icon color={color} />
        <Typography color={color} isBold type="h2">
          {time.format('h:mm A')}
        </Typography>
        {hasDayDiff && (
          <Typography
            color={color}
            isBold
            style={{ position: 'absolute', right: -5, top: -10 }}
          >
            {data.destination.dayDiff}
          </Typography>
        )}
      </Group>
    </Group>
  );
};
