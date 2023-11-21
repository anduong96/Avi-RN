import * as React from 'react';
import { View } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@app/lib/hooks/use.theme';

type Props = React.PropsWithChildren<
  (
    | {
        height: number;
      }
    | {
        size: 'large' | 'medium' | 'small';
      }
  ) & { style?: StyleProp<ViewStyle> }
>;

export const SpaceVertical: React.FC<Props> = (props) => {
  const theme = useTheme();
  return (
    <View
      {...props}
      style={[
        'height' in props && { paddingVertical: props.height / 2 },
        'size' in props && { paddingVertical: theme.space[props.size] / 2 },
        props.style,
      ]}
    />
  );
};
