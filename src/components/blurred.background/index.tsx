import type { BlurViewProps } from '@react-native-community/blur';

import React from 'react';
import { StyleSheet } from 'react-native';

import tinycolor from 'tinycolor2';
import { BlurView } from '@react-native-community/blur';

import { withStyled } from '@app/lib/styled';
import { IS_ANDROID } from '@app/lib/platform';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = Pick<BlurViewProps, 'blurType' | 'style'>;
export const BlurredBackground: React.FC<Props> = ({ blurType, style }) => {
  const theme = useTheme();
  const displayBlurType = blurType ?? theme.isDark ? 'dark' : 'light';

  return <Container blurType={displayBlurType} style={style} />;
};

const Container = withStyled(BlurView, (theme) => [
  StyleSheet.absoluteFillObject,
  IS_ANDROID && {
    backgroundColor: tinycolor(theme.pallette.grey[50])
      .setAlpha(0.5)
      .toRgbString(),
  },
]);
