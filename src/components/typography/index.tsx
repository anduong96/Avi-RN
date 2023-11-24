import * as React from 'react';
import { Text } from 'react-native';

import type { TextProps, TextStyle } from 'react-native';

import type { Theme } from '@app/themes';

import { isNil } from '@app/lib/is.nil';
import { withStyled } from '@app/lib/styled';

type Props = {
  color?: 'active' | 'danger' | 'secondary' | 'warn' | string;
  isBold?: boolean;
  isCentered?: boolean;
  isThin?: boolean;
  lineHeight?: number;
  textAlign?: TextStyle['textAlign'];
  type?: keyof Theme['typography']['presets'];
} & TextProps;

export const Typography: React.FC<Props> = ({
  color,
  isBold,
  isCentered,
  isThin,
  lineHeight,
  textAlign,
  type,
  ...props
}) => {
  return (
    <DisplayText
      color={color}
      isBold={isBold}
      isCentered={isCentered}
      isThin={isThin}
      lineHeight={lineHeight}
      textAlign={textAlign}
      type={type}
      {...props}
    />
  );
};

const DisplayText = withStyled<Props, typeof Text>(Text, (theme, props) => [
  theme.typography.presets[props.type ?? 'p1'],
  {
    color: props.color || theme.pallette.text,
  },
  !isNil(props.lineHeight) && {
    lineHeight: props.lineHeight,
  },
  props.textAlign && {
    textAlign: props.textAlign,
  },
  props.isThin && {
    fontWeight: '100',
  },
  props.isBold && {
    fontWeight: 'bold',
  },
  props.isCentered && {
    textAlign: 'center',
  },
  props.color === 'active' && {
    color: theme.pallette.active,
  },
  props.color === 'warn' && {
    color: theme.pallette.warn,
  },
  props.color === 'danger' && {
    color: theme.pallette.danger,
  },
  props.color === 'secondary' && {
    color: theme.pallette.textSecondary,
  },
]);
