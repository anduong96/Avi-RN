import * as React from 'react';

import { Card } from '@app/components/card';
import { Typography } from '@app/components/typography';
import { useMeasurementDisplay } from '@app/lib/hooks/use.measurement.display';

import { useFlight } from './context';

export const FlightDistanceCard: React.FC = () => {
  const flight = useFlight();
  const distance = useMeasurementDisplay('km', flight.totalDistanceKm);

  if (!distance) {
    return null;
  }

  return (
    <Card isCentered padding="medium">
      <Typography color="secondary" type="p2">
        Distance
      </Typography>
      <Typography type="h1">{distance}</Typography>
    </Card>
  );
};
