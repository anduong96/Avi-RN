import * as React from 'react';

import { BtnText, Container } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';
import { LoadingOverlay } from '../loading.overlay';
import { StringRenderer } from '../string.renderer';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = React.PropsWithChildren<{
  shadow?: boolean;
  type?: 'primary' | 'active';
  prefix?: React.ReactElement;
  postfix?: React.ReactElement;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'medium' | 'large';
}>;

export const Button = React.forwardRef<unknown, Props>(
  (
    {
      children,
      isLoading,
      disabled,
      fullWidth,
      onPress,
      shadow,
      style,
      prefix,
      postfix,
      size = 'medium',
    },
    ref,
  ) => {
    const theme = useTheme();
    return (
      <Container
        ref={ref}
        shadow={shadow}
        fullWidth={fullWidth}
        style={[
          size === 'large' && { paddingVertical: theme.space.medium },
          size === 'small' && { paddingVertical: theme.space.tiny },
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <LoadingOverlay
          isLoading={isLoading}
          style={{ backgroundColor: theme.pallette.primary }}
        />
        <>
          {prefix}
          <StringRenderer
            value={children}
            Container={BtnText}
            style={[
              disabled && { color: theme.pallette.grey[400] },
              size === 'small' && {
                fontSize: theme.typography.presets.small.fontSize,
              },
            ]}
          />
          {postfix}
        </>
      </Container>
    );
  },
);

export const AnimatedButton = Animated.createAnimatedComponent(Button);
