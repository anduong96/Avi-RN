import type { BlurViewProps } from '@react-native-community/blur';

import React from 'react';
import { StyleSheet } from 'react-native';

import tinycolor from 'tinycolor2';
import { BlurView } from '@react-native-community/blur';

import { IS_IOS } from '@app/lib/platform';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = Pick<BlurViewProps, 'blurType' | 'style'>;
export const BlurredBackground: React.FC<Props> = ({ blurType, style }) => {
  const theme = useTheme();
  const displayBlurType = blurType ?? (theme.isDark ? 'dark' : 'xlight');

  if (IS_IOS) {
    return <Container blurType={displayBlurType} style={style} />;
  }

  return (
    <Container
      blurType={displayBlurType}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /** @ts-expect-error */
      overlayColor={tinycolor(theme.pallette.grey[50])
        .setAlpha(0.6)
        .toRgbString()}
      style={style}
    />
  );
};

const Container = withStyled(BlurView, () => [StyleSheet.absoluteFillObject]);
