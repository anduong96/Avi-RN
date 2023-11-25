import * as React from 'react';

import { Group } from '@app/components/group';
import { DOT_SEPARATOR } from '@app/constants';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';
import { transformFlightData } from '@app/lib/transformers/transform.flight.data';

import { useFlight } from './context';

export const Meta: React.FC = () => {
  const theme = useTheme();
  const flight = useFlight();
  const data = transformFlightData(flight);

  return (
    <Group
      direction="row"
      gap="small"
      horizontalAlign="center"
      verticalAlign="center"
    >
      <Group direction="row" gap="tiny" verticalAlign="center">
        <AirlineLogoAvatar
          airlineIata={flight.airlineIata}
          size={theme.typography.presets.h2.fontSize}
        />
        <Typography isBold type="p1">
          {flight.airlineIata}
          {` `}
          {flight.flightNumber}
        </Typography>
      </Group>
      <Typography isBold type="p1">
        {DOT_SEPARATOR}
      </Typography>
      <Typography isBold type="p1">
        {data.origin.time.format('MMM D, YYYY')}
      </Typography>
    </Group>
  );
};
