import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  color?: string;
  size: number;
  style?: StyleProp<ViewStyle>;
  type?: 'fill' | 'outline';
};

export const Circle: React.FC<Props> = ({
  color,
  size,
  style,
  type = 'fill',
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        type === 'fill' && { backgroundColor: color },
        type === 'outline' && {
          backgroundColor: theme.pallette.background,
          borderColor: color,
          borderStyle: 'solid',
          borderWidth: StyleSheet.hairlineWidth,
        },
        { borderRadius: size, height: size, width: size },
        style,
      ]}
    />
  );
};
