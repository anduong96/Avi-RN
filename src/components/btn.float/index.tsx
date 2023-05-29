import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import { Button } from '../button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = React.PropsWithChildren<{
  size?: number;
  style?: StyleProp<ViewStyle>;
}> &
  React.ComponentProps<typeof Button>;

export const FloatBtn: React.FC<Props> = ({
  size = 70,
  children,
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
          position: 'absolute',
          bottom: insets.bottom || theme.space.medium,
          right: insets.right || theme.space.medium,
          width: size,
          height: undefined,
          aspectRatio: 1,
          borderRadius: size,
          zIndex: 1,
        },
        style,
      ]}
    >
      {children}
    </Button>
  );
};
