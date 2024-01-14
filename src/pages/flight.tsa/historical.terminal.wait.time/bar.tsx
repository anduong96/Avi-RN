import * as React from 'react';
import { View } from 'react-native';

import { withStyled } from '@app/lib/styled';
import { Typography } from '@app/components/typography';

type Props = {
  columnHeight: number;
  isActive: boolean;
  label: string;
  value: number;
};

export const Bar: React.FC<Props> = ({
  columnHeight,
  isActive,
  label,
  value,
}) => {
  return (
    <Container>
      <Typography isBold isCentered type="tiny">
        {value}m
      </Typography>
      <Column columnHeight={columnHeight} isActive={isActive} />
      <Typography color={'secondary'} isBold isCentered type="tiny">
        {label}
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
    width: 40,
  },
  props.isActive && {
    backgroundColor: theme.pallette.active,
    shadowColor: theme.pallette.active,
  },
]);
