import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

import * as React from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { AnimatedBlurredView } from '../blurred/view';
type Props = BottomSheetBackdropProps;

export const BlurredSheetBackdrop: React.FC<Props> = ({
  animatedIndex,
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

  return <AnimatedBlurredView blurType="dark" style={[animatedStyle, style]} />;
};
