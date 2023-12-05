import * as React from 'react';

import tinycolor from 'tinycolor2';

import { Card } from '@app/components/card';
import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';

import { useFlight } from './context';
import { useIsOnDifferentFlight } from './hooks/use.is.on.different.flight';

export const PlaneLocationCard: React.FC = () => {
  const isVisible = useIsOnDifferentFlight();
  const flight = useFlight();
  const theme = useTheme();

  if (!isVisible) {
    return null;
  }

  return (
    <Group paddingHorizontal={'medium'}>
      <Card
        padding={'large'}
        style={{
          backgroundColor: tinycolor(theme.pallette.danger)
            .setAlpha(0.1)
            .toRgbString(),
        }}
      >
        <Typography color={theme.pallette.danger} isBold isCentered type="h3">
          Plane has not landed at {flight.Origin.iata}.
        </Typography>
      </Card>
    </Group>
  );
};
