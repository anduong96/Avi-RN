import * as React from 'react';
import { View } from 'react-native';

import moment from 'moment';

import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { useCountDown } from '@app/lib/hooks/use.count.down';
import { formatDurationMs } from '@app/lib/duration/format.duration';
import { transformFlightData } from '@app/lib/transformers/transform.flight.data';

import { useFlight } from '../context';

export const DepartStatus: React.FC = () => {
  const flight = useFlight();
  const formatted = transformFlightData(flight);
  const theme = useTheme();
  const timeToDepart = React.useMemo(
    () => moment(flight.estimatedGateDeparture).diff(new Date()),
    [flight],
  );
  const timeLeft = useCountDown(timeToDepart);

  const [, statusColor] =
    formatted.origin.status === 'early'
      ? ['Early', theme.pallette.success]
      : formatted.origin.status === 'delayed'
        ? ['Delayed', theme.pallette.warn]
        : formatted.origin.status === 'late'
          ? ['Late', theme.pallette.danger]
          : ['On Time', theme.pallette.success];

  return (
    <Card
      padding="large"
      style={[
        {
          backgroundColor: theme.pallette.background,
          borderColor: statusColor,
          borderWidth: theme.borderWidth,
        },
      ]}
    >
      <Content>
        <Meta>
          <Typography isBold status="secondary">
            Depart in
          </Typography>
          <Typography isBold type="massive">
            {formatDurationMs(timeLeft)}
          </Typography>
        </Meta>
      </Content>
    </Card>
  );
};

const Meta = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexBasis: 1,
    flexGrow: 1,
    gap: theme.space.small,
  },
]);

const Content = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
  },
]);
