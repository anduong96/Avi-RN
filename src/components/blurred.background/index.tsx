import type { BlurViewProps } from '@react-native-community/blur';

import React from 'react';
import { StyleSheet } from 'react-native';

import tinycolor from 'tinycolor2';
import { BlurView } from '@react-native-community/blur';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = Pick<BlurViewProps, 'blurType' | 'style'>;
export const BlurredBackground: React.FC<Props> = ({ blurType, style }) => {
  const theme = useTheme();
  const displayBlurType = blurType ?? theme.isDark ? 'dark' : 'xlight';

  return (
    <Container
      blurType={displayBlurType}
      overlayColor={tinycolor(theme.pallette.grey[50])
        .setAlpha(0.6)
        .toRgbString()}
      style={style}
    />
  );
};

const Container = withStyled(BlurView, () => [StyleSheet.absoluteFillObject]);
