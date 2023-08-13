import * as React from 'react';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { BlurView } from '@react-native-community/blur';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { styled } from '@app/lib/styled';

type Props = BottomSheetBackdropProps;

export const BlurredSheetBackdrop: React.FC<Props> = ({
  animatedIndex,
  // animatedPosition,
  style,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));

  return <Container blurType="dark" style={[animatedStyle, style]} />;
};

const Container = styled(Animated.createAnimatedComponent(BlurView), () => []);
