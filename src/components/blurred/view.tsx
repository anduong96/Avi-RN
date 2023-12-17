import type { BlurViewProps } from '@react-native-community/blur';

import React from 'react';
import { type View } from 'react-native';
import Animated from 'react-native-reanimated';

import { BlurView } from '@react-native-community/blur';

import type { UnionToIntersection } from '@app/types/union.to.intersection';

import { useTheme } from '@app/lib/hooks/use.theme';
import { IS_ANDROID, IS_IOS } from '@app/lib/platform';

import { useOverlayColor } from './get.overlay.color';

type Props = UnionToIntersection<BlurViewProps>;

export const BlurredView = React.forwardRef<View, Props>(
  (
    { blurAmount, blurRadius, blurType, downsampleFactor, style, ...props },
    ref,
  ) => {
    const theme = useTheme();
    const displayBlurType =
      blurType ?? (theme.isDark ? 'dark' : IS_ANDROID ? 'light' : 'xlight');
    const overlayColor = IS_ANDROID
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useOverlayColor(displayBlurType)
      : undefined;

    if (IS_IOS) {
      return (
        <BlurView
          {...props}
          blurAmount={blurAmount}
          blurRadius={blurRadius}
          blurType={displayBlurType}
          ref={ref}
          style={style}
        />
      );
    }

    return (
      <BlurView
        {...props}
        blurAmount={blurAmount}
        blurRadius={blurRadius}
        blurType={displayBlurType}
        downsampleFactor={downsampleFactor}
        overlayColor={overlayColor}
        ref={ref}
        style={style}
      />
    );
  },
);

export const AnimatedBlurredView =
  Animated.createAnimatedComponent(BlurredView);
