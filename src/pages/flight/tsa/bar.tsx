import * as React from 'react';
import { View } from 'react-native';

import moment from 'moment';

import type { AirportTsaWaitTime } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { Typography } from '@app/components/typography';

type Props = {
  columnHeight: number;
  isActive: boolean;
  value: Omit<AirportTsaWaitTime, '__typename' | 'updatedAt'>;
};

export const Bar: React.FC<Props> = ({ columnHeight, isActive, value }) => {
  return (
    <Container>
      <Typography isBold isCentered type="tiny">
        {value.maxWaitMinute}m
      </Typography>
      <Column columnHeight={columnHeight} isActive={isActive} />
      <Typography color={'secondary'} isBold isCentered type="small">
        {moment().set('hour', value.hour).format('h A')}
      </Typography>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  {
    flexBasis: 1,
    flexGrow: 1,
    gap: theme.space.small,
    justifyContent: 'flex-end',
    width: 40,
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
  props.isActive && {
    backgroundColor: theme.pallette.active,
    shadowColor: theme.pallette.active,
  },
]);
