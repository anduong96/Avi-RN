import type { BlurViewProps } from '@react-native-community/blur';

import React from 'react';
import { StyleSheet } from 'react-native';

import { BlurView } from '@react-native-community/blur';

import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = Pick<BlurViewProps, 'blurType' | 'style'>;
export const BlurredBackground: React.FC<Props> = ({ blurType, style }) => {
  const theme = useTheme();
  return (
    <Container
      blurType={blurType ?? theme.isDark ? 'dark' : 'light'}
      style={style}
    />
  );
};

const Container = styled(BlurView, () => [StyleSheet.absoluteFillObject]);
