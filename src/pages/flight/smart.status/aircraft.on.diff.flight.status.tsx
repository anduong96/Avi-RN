import * as React from 'react';

import tinycolor from 'tinycolor2';

import { Card } from '@app/components/card';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';

export const AircraftOnDifferenceFlightStatus: React.FC = () => {
  const theme = useTheme();
  const cardColor = theme.pallette.warn;

  return (
    <Card
      style={{
        backgroundColor: tinycolor(cardColor).setAlpha(0.2).toRgbString(),
        borderColor: cardColor,
        borderWidth: theme.borderWidth,
      }}
    >
      <Typography isBold isCentered type="h1">
        Plane is not at airport
      </Typography>
    </Card>
  );
};
