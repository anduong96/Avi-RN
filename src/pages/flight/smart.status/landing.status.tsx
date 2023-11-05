import * as React from 'react';
import { View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import tinycolor from 'tinycolor2';

import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { formatDurationMs } from '@app/lib/duration/format.duration';

import { useFlight } from '../hooks/use.flight';

export const LandingStatus: React.FC = () => {
  const theme = useTheme();
  const flight = useFlight(true);

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
      <Content>
        <Meta>
          <Typography isBold status="secondary">
            Land in
          </Typography>
          <Typography isBold type="h1">
            {formatDurationMs(flight.remainingDurationMs)}
          </Typography>
        </Meta>
        <Status>
          <CircularProgress
            activeStrokeColor={theme.pallette.active}
            inActiveStrokeColor={theme.pallette.background}
            progressValueColor={theme.pallette.text}
            progressValueStyle={{
              fontSize: theme.typography.presets.h1.fontSize,
            }}
            value={flight.progressPercent * 100}
            valueSuffix={'%'}
            valueSuffixStyle={{
              fontSize: theme.typography.presets.small.fontSize,
            }}
          />
        </Status>
      </Content>
    </Card>
  );
};

const Content = withStyled(View, (theme) => ({
  flexDirection: 'row',
  gap: theme.space.medium,
}));

const Meta = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexBasis: 1,
    flexGrow: 1,
    gap: theme.space.small,
  },
]);

const Status = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexBasis: 1,
    flexGrow: 1,
  },
]);
