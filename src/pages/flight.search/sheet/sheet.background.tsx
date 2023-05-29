import { StyleSheet, View } from 'react-native';

// import { BlurView } from '@react-native-community/blur';
import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import React from 'react';
import { styled } from '@app/lib/styled';

export const BlurredBottomSheetBackground: React.FC<
  BottomSheetBackgroundProps
> = () => {
  return (
    <Container>
      {/* <BlurView blurType="xlight" style={[StyleSheet.absoluteFillObject]} /> */}
    </Container>
  );
};

const Container = styled(View, (theme) => [
  StyleSheet.absoluteFillObject,
  {
    overflow: 'hidden',
    borderRadius: theme.borderRadius,
    backgroundColor: theme.pallette.background,
  },
]);
