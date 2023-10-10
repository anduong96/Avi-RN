import type { StyleProp, ViewStyle } from 'react-native';

import * as React from 'react';
import { View } from 'react-native';

import { useTheme } from '@app/lib/hooks/use.theme';

type Props = React.PropsWithChildren<
  (
    | {
        size: 'large' | 'medium' | 'small' | 'tiny';
      }
    | {
        width: number;
      }
  ) & { style?: StyleProp<ViewStyle> }
>;

export const SpaceHorizontal: React.FC<Props> = (props) => {
  const theme = useTheme();
  return (
    <View
      {...props}
      style={[
        'width' in props && { paddingHorizontal: props.width / 2 },
        'size' in props && { paddingHorizontal: theme.space[props.size] / 2 },
        props.style,
      ]}
    />
  );
};
