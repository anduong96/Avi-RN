import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@app/lib/hooks/use.theme';

import { Button } from '../button';

type Props = React.PropsWithChildren<{
  size?: number;
  style?: StyleProp<ViewStyle>;
}> &
  React.ComponentProps<typeof Button>;

export const FloatBtn: React.FC<Props> = ({
  children,
  size = 70,
  style,
  ...props
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Button
      {...props}
      style={[
        theme.presets.shadows[400],
        theme.presets.centered,
        {
          aspectRatio: 1,
          borderRadius: size,
          bottom: insets.bottom || theme.space.medium,
          height: undefined,
          position: 'absolute',
          right: insets.right || theme.space.medium,
          width: size,
          zIndex: 1,
        },
        style,
      ]}
    >
      {children}
    </Button>
  );
};
