import * as React from 'react';

import moment from 'moment';

import { Card } from '@app/components/card';
import { Typography } from '@app/components/typography';
import { formatDurationMs } from '@app/lib/duration/format.duration';

import { useFlight } from './context';

export const FlightDurationCard: React.FC = () => {
  const flight = useFlight();
  const { estimatedGateArrival, estimatedGateDeparture } = flight;
  const diff = moment(estimatedGateArrival).diff(estimatedGateDeparture);
  const durationText = formatDurationMs(diff);

  return (
    <Card isCentered padding={'medium'}>
      <Typography color="secondary" type="p2">
        Duration
      </Typography>
      <Typography type="h1">{durationText}</Typography>
    </Card>
  );
};
