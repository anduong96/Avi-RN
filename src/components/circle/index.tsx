import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
  type?: 'fill' | 'outline';
};

export const Circle: React.FC<Props> = ({
  size,
  style,
  color,
  type = 'fill',
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        type === 'fill' && { backgroundColor: color },
        type === 'outline' && {
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: color,
          backgroundColor: theme.pallette.background,
          borderStyle: 'solid',
        },
        { width: size, height: size, borderRadius: size },
        style,
      ]}
    />
  );
};
