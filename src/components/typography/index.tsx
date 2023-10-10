import type { TextProps } from 'react-native';

import * as React from 'react';
import { Text } from 'react-native';

import type { Theme } from '@app/themes';

import { styled } from '@app/lib/styled';

type Props = {
  isBold?: boolean;
  type?: keyof Theme['typography']['presets'];
} & TextProps;

export const Typography: React.FC<Props> = ({ isBold, type, ...props }) => {
  return <DisplayText isBold={isBold} type={type} {...props} />;
};

const DisplayText = styled<Pick<Props, 'isBold' | 'type'>, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets[props.type ?? 'p1'],
    props.isBold && {
      fontWeight: 'bold',
    },
  ],
);
