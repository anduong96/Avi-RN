import { styled } from '@app/lib/styled';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

export const BlurredBackground: React.FC = () => {
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
