import Animated from 'react-native-reanimated';
import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet } from 'react-native';
import { styled } from '@app/lib/styled';

export const BlurredBottomSheetBackground: React.FC<
  BottomSheetBackgroundProps
> = () => {
  return <Container />;
};

const Container = styled(Animated.View, (theme) => [
  StyleSheet.absoluteFillObject,
  {
    overflow: 'hidden',
    borderRadius: theme.borderRadius,
    backgroundColor: theme.pallette.background,
  },
]);
