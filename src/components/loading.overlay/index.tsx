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
};

const Container = styled(Animated.View, (theme) => [
  theme.presets.centered,
  {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: theme.pallette.background,
  },
]);

export const LoadingOverlay: React.FC<Props> = ({
  isLoading,
  style,
  size = 'large',
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Container exiting={FadeOut} style={style}>
      <Animated.View entering={FadeIn.delay(750)}>
        <ActivityIndicator size={size} />
      </Animated.View>
    </Container>
  );
};
