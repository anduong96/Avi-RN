import * as React from 'react';
import { Text } from 'react-native';

import type { TextProps } from 'react-native';

import type { Theme } from '@app/themes';

import { isNil } from '@app/lib/is.nil';
import { withStyled } from '@app/lib/styled';

type Props = {
  isBold?: boolean;
  isCentered?: boolean;
  lineHeight?: number;
  status?: 'active' | 'danger' | 'secondary' | 'warn';
  type?: keyof Theme['typography']['presets'];
} & TextProps;

export const Typography: React.FC<Props> = ({
  isBold,
  isCentered,
  lineHeight,
  type,
  ...props
}) => {
  return (
    <DisplayText
      isBold={isBold}
      isCentered={isCentered}
      lineHeight={lineHeight}
      type={type}
      {...props}
    />
  );
};

const DisplayText = withStyled<
  Pick<Props, 'isBold' | 'isCentered' | 'lineHeight' | 'status' | 'type'>,
  typeof Text
>(Text, (theme, props) => [
  theme.typography.presets[props.type ?? 'p1'],
  {
    color: theme.pallette.text,
  },
  !isNil(props.lineHeight) && {
    lineHeight: props.lineHeight,
  },
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
  props.status === 'secondary' && {
    color: theme.pallette.textSecondary,
  },
]);
