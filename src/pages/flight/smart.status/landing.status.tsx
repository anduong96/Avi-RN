import * as React from 'react';
import { View } from 'react-native';

import tinycolor from 'tinycolor2';

import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { useCountDown } from '@app/lib/hooks/use.count.down';
import { formatDurationMs } from '@app/lib/duration/format.duration';

import { useFlight } from '../context';

export const LandingStatus: React.FC = () => {
  const theme = useTheme();
  const flight = useFlight();
  const timeLeftMs = useCountDown(flight.remainingDurationMs);

  return (
    <Card
      padding="large"
      style={[
        {
          backgroundColor: tinycolor(theme.pallette.active)
            .setAlpha(0.1)
            .toRgbString(),
          borderColor: theme.pallette.active,
          borderWidth: theme.borderWidth,
        },
      ]}
    >
      <Content>
        <Meta>
          <Typography isBold status="secondary">
            Arrive in
          </Typography>
          <Typography isBold type="massive">
            {formatDurationMs(timeLeftMs)}
          </Typography>
        </Meta>
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
