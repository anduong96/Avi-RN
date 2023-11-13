import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import type { AirportTsaWaitTime } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';

type Props = {
  columnHeight: number;
  isActive: boolean;
  value: Omit<AirportTsaWaitTime, '__typename' | 'updatedAt'>;
};

export const Bar: React.FC<Props> = ({ columnHeight, isActive, value }) => {
  return (
    <Container>
      <MinutesLabel>{value.maxWaitMinute}m</MinutesLabel>
      <Column columnHeight={columnHeight} isActive={isActive} />
      <TimeLabel>{moment().set('hour', value.hour).format('h A')}</TimeLabel>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  {
    flexBasis: 1,
    flexGrow: 1,
    gap: theme.space.small,
    justifyContent: 'flex-end',
  },
]);

const Column = withStyled<
  Pick<Props, 'columnHeight' | 'isActive'>,
  typeof View
>(View, (theme, props) => [
  {
    backgroundColor: theme.pallette.grey[200],
    borderRadius: theme.borderRadius,
    height: props.columnHeight,
  },
  theme.presets.shadows[200],
  {
    backgroundColor: theme.pallette.active,
    shadowColor: theme.pallette.active,
  },
]);

const MinutesLabel = withStyled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.text,
    textAlign: 'center',
  },
]);

const TimeLabel = withStyled(Text, (theme) => [
  theme.typography.presets.tiny,
  {
    color: theme.pallette.textSecondary,
    textAlign: 'center',
  },
]);
