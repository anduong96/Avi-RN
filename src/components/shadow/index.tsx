import type { ShadowProps as RnShadowProps } from 'react-native-shadow-2';

import * as React from 'react';
import { Shadow as RnShadow } from 'react-native-shadow-2';

import type { StyleProp, ViewStyle } from 'react-native';

import tinycolor from 'tinycolor2';

import { useTheme } from '@app/lib/hooks/use.theme';

type Props = React.PropsWithChildren<{
  color?: string;
  darken?: number;
  disabled?: boolean;
  level?: 1 | 2 | 3;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
}> &
  Pick<RnShadowProps, 'distance' | 'offset'>;

export type ShadowProps = Props;

const levels: Record<
  NonNullable<Props['level']>,
  Pick<RnShadowProps, 'distance' | 'offset'>
> = {
  1: {
    distance: 3,
    offset: [1, 3],
  },
  2: {
    distance: 3,
    offset: [4, 4],
  },
  3: {
    distance: 20,
    offset: [10, 10],
  },
};

export const Shadow: React.FC<Props> = ({
  children,
  color,
  darken = 0,
  disabled = false,
  distance,
  level,
  offset,
  opacity = 0.7,
  style,
}) => {
  const theme = useTheme();
  const config = level ? levels[level] : {};

  return (
    <RnShadow
      disabled={disabled}
      distance={distance ?? config.distance}
      offset={offset ?? config.offset}
      startColor={tinycolor(
        color ?? theme.pallette.grey[theme.isDark ? 50 : 100],
      )
        .darken(darken)
        .setAlpha(opacity)
        .toRgbString()}
      stretch
      style={style}
    >
      {children}
    </RnShadow>
  );
};
