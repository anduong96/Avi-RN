import * as React from 'react';

import type {
  ActivityIndicatorProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { ActivityIndicator } from 'react-native';
import { styled } from '@app/lib/styled';

type Props = {
  isLoading?: boolean;
  size?: ActivityIndicatorProps['size'];
  style?: StyleProp<ViewStyle>;
  isDark?: boolean;
  type?: 'translucent' | 'solid';
};

export const LoadingOverlay: React.FC<Props> = ({
  isLoading,
  style,
  isDark,
  type = 'solid',
  size = 'large',
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Container type={type} isDark={isDark} exiting={FadeOut} style={[style]}>
      <Animated.View entering={FadeIn.delay(750)}>
        <ActivityIndicator color={isDark ? 'white' : 'black'} size={size} />
      </Animated.View>
    </Container>
  );
};

const Container = styled<Pick<Props, 'isDark' | 'type'>, typeof Animated.View>(
  Animated.View,
  (theme, props) => [
    theme.presets.centered,
    {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1,
    },
    props.type === 'translucent' &&
      props.isDark && {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      },
    props.type === 'translucent' &&
      !props.isDark && {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      },
    props.type === 'solid' &&
      props.isDark && {
        backgroundColor: '#000',
      },
    props.type === 'solid' &&
      !props.isDark && {
        backgroundColor: '#fff',
      },
  ],
);
