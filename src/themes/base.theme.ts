import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import tinycolor from 'tinycolor2';

function makeStyle<P extends ImageStyle | TextStyle | ViewStyle>(style: P) {
  return style;
}

const white = '#fff';
const black = '#000';

const blackColor = tinycolor(black);

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
} as const;

const pallette = {
  active: '#0171E3',
  background: blackColor.clone().lighten(5).toHexString(),
  black,
  borderColor: grey[200],
  card: grey[50],
  danger: '#FF4444',
  disabled: grey[400],
  grey,
  primary: '#DBCE1B',
  secondary: '#fff',
  success: '#00C851',
  text: white,
  textSecondary: grey[500],
  transparent: 'rgba(0,0,0,0)',
  warn: '#FFBB33',
  white,
};

const shadows = {
  [100]: makeStyle({
    shadowColor: black,
    shadowOffset: {
      height: 6,
      width: 3,
    },
    shadowOpacity: 0.43,
    shadowRadius: 5,
  }),
  [200]: makeStyle({
    shadowColor: black,
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
    h1: makeStyle({
      color: pallette.text,
      fontSize: 35,
      lineHeight: 41,
    }),
    h2: makeStyle({
      color: pallette.text,
      fontSize: 24,
      lineHeight: 33,
    }),
    h3: makeStyle({
      color: pallette.text,
      fontSize: 20,
      lineHeight: 25,
    }),
    h4: makeStyle({
      color: pallette.text,
      fontSize: 18,
      lineHeight: 19,
    }),
    massive: makeStyle({
      color: pallette.text,
      fontSize: 60,
      lineHeight: 75,
    }),
    p1: makeStyle({
      color: pallette.text,
      fontSize: 17,
      lineHeight: 25,
    }),
    p2: makeStyle({
      color: pallette.text,
      fontSize: 14,
    }),
    small: makeStyle({
      color: pallette.text,
      fontSize: 12,
    }),
    tiny: makeStyle({
      color: pallette.text,
      fontSize: 10,
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
