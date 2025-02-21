import { RFValue } from 'react-native-responsive-fontsize';
import { type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

import tinycolor from 'tinycolor2';

const WHITE = '#fff';
const BLACK = '#000';

export function makeStyle<P extends ImageStyle | TextStyle | ViewStyle>(
  style: P,
) {
  return style;
}

export const blackColor = tinycolor(BLACK);

const grey = {
  50: blackColor.clone().lighten(7).toHexString(),
  100: blackColor.clone().lighten(10).toHexString(),
  200: blackColor.clone().lighten(30).toHexString(),
  300: blackColor.clone().lighten(40).toHexString(),
  400: blackColor.clone().lighten(50).toHexString(),
  500: blackColor.clone().lighten(60).toHexString(),
  600: blackColor.clone().lighten(70).toHexString(),
  700: blackColor.clone().lighten(80).toHexString(),
  800: blackColor.clone().lighten(90).toHexString(),
  900: blackColor.clone().lighten(95).toHexString(),
};

const pallette = {
  active: '#0379DC',
  background: blackColor.clone().toHexString(),
  black: BLACK,
  borderColor: grey[200],
  card: grey[50],
  danger: '#FF4444',
  disabled: grey[400],
  dividerColor: grey[100],
  grey,
  primary: '#0379DC',
  secondary: '#0DE3FE',
  success: '#00C851',
  text: WHITE,
  textSecondary: grey[500],
  transparent: 'rgba(0,0,0,0)',
  warn: '#FFBB33',
  white: WHITE,
};

const shadows = {
  [100]: makeStyle({
    elevation: 5,
    shadowColor: BLACK,
    shadowOffset: {
      height: 6,
      width: 3,
    },
    shadowOpacity: 0.43,
    shadowRadius: 5,
  }),
  [200]: makeStyle({
    elevation: 3,
    shadowColor: BLACK,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1,
  }),
} as const;

const borderRadius = 20;
const borderWidth = 2;

const typography = {
  presets: {
    h0: makeStyle({
      fontSize: RFValue(45),
    }),
    h1: makeStyle({
      fontSize: RFValue(30),
    }),
    h2: makeStyle({
      fontSize: RFValue(24),
    }),
    h3: makeStyle({
      fontSize: RFValue(17),
    }),
    h4: makeStyle({
      fontSize: RFValue(18),
    }),
    massive: makeStyle({
      fontSize: RFValue(60),
    }),
    p1: makeStyle({
      fontSize: RFValue(15),
    }),
    p2: makeStyle({
      fontSize: RFValue(14),
    }),
    small: makeStyle({
      fontSize: RFValue(12),
    }),
    tiny: makeStyle({
      fontSize: RFValue(10),
    }),
  },
};

export type SpaceKeys = 'large' | 'medium' | 'small' | 'tiny' | 'xLarge';
type SpaceFn = (size: number) => number;
type Space = SpaceFn & Record<SpaceKeys, number>;

const spaceFn: SpaceFn = (size: number) => {
  return size * 3;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const space: Space = spaceFn;
space.large = spaceFn(12);
space.xLarge = spaceFn(15);
space.medium = spaceFn(7);
space.small = spaceFn(4);
space.tiny = spaceFn(2);

export const BASE_THEME = {
  borderRadius,
  borderWidth,
  dividerSize: 1,
  isDark: true,
  pallette,
  presets: {
    centered: makeStyle({
      alignItems: 'center',
      justifyContent: 'center',
    }),
    input: makeStyle({
      borderColor: pallette.grey[200],
      borderRadius: borderRadius,
      borderStyle: 'solid',
      borderWidth: borderWidth,
    }),
    outlinedBox: makeStyle({
      borderColor: pallette.borderColor,
      borderRadius,
      borderWidth: borderWidth,
    }),
    shadows,
  },
  roundRadius: 1000,
  space,
  typography,
};

export type Theme = typeof BASE_THEME;
