import type { TextProps } from 'react-native';

import * as React from 'react';
import { Text } from 'react-native';

import type { Theme } from '@app/themes';

import { withStyled } from '@app/lib/styled';

type Props = {
  isBold?: boolean;
  isCentered?: boolean;
  status?: 'active' | 'danger' | 'warn';
  type?: keyof Theme['typography']['presets'];
} & TextProps;

export const Typography: React.FC<Props> = ({
  isBold,
  isCentered,
  type,
  ...props
}) => {
  return (
    <DisplayText
      isBold={isBold}
      isCentered={isCentered}
      type={type}
      {...props}
    />
  );
};

const DisplayText = withStyled<
  Pick<Props, 'isBold' | 'isCentered' | 'status' | 'type'>,
  typeof Text
>(Text, (theme, props) => [
  theme.typography.presets[props.type ?? 'p1'],
  props.isBold && {
    fontWeight: 'bold',
  },
  props.isCentered && {
    textAlign: 'center',
  },
  props.status === 'active' && {
    color: theme.pallette.active,
  },
  props.status === 'warn' && {
    color: theme.pallette.warn,
  },
  props.status === 'danger' && {
    color: theme.pallette.danger,
  },
]);
