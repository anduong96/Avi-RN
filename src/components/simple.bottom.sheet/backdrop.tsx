import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

import * as React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const Backdrop: React.FC<
  BottomSheetBackdropProps & {
    onClose?: () => void;
  }
> = ({ animatedIndex, onClose, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    display: animatedIndex.value === 0 ? 'none' : 'flex',
    opacity: interpolate(
      animatedIndex.value,
      [-1, 1],
      [-1, 1],
      Extrapolate.CLAMP,
    ),
  }));

  return (
    <Animated.View
      onTouchStart={() => onClose?.()}
      style={[
        style,
        { backgroundColor: 'rgba(0,0,0,0.3)' },
        containerAnimatedStyle,
      ]}
    />
  );
};
