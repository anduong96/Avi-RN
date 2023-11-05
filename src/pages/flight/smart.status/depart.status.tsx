import * as React from 'react';
import { View } from 'react-native';

import moment from 'moment';
import tinycolor from 'tinycolor2';

import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { formatDurationMs } from '@app/lib/duration/format.duration';

import { useFlight } from '../hooks/use.flight';

export const DepartStatus: React.FC = () => {
  const flight = useFlight(true);
  const theme = useTheme();

  return (
    <Card
      style={{
        backgroundColor: tinycolor(theme.pallette.active)
          .setAlpha(0.1)
          .toRgbString(),
        borderColor: theme.pallette.active,
        borderWidth: theme.borderWidth,
      }}
    >
      <Meta>
        <Typography isBold status="secondary">
          Depart in
        </Typography>
        <Typography isBold type="h1">
          {formatDurationMs(moment().diff(flight.estimatedGateDeparture))}
        </Typography>
      </Meta>
    </Card>
  );
};

const Meta = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    gap: theme.space.small,
  },
]);
