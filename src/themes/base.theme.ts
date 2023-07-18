import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

function makeStyle<P extends ViewStyle | TextStyle | ImageStyle>(style: P) {
  return style;
}

const white = '#fff';
const black = '#000';
const grey = {
  50: '#FAFAFA',
  100: '#F3F3F3',
  200: '#EEEEEE',
  300: '#E0E0E0',
  400: '#BDBDBD',
  500: '#9E9E9E',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
} as const;

const pallette = {
  background: white,
  borderColor: grey[100],
  disabled: grey[400],
  transparent: 'rgba(255, 255, 255, 0)',
  primary: '#000',
  secondary: '#fff',
  active: '#0171E3',
  danger: '#CC0000',
  dangerLight: '#FF4444',
  warn: '#FF8800',
  warnLight: '#FFBB33',
  success: '#007E33',
  successLight: '#00C851',
  grey,
  white,
  black,
};

const shadows = {
  [100]: makeStyle({
    shadowColor: black,
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 4,
  }),
  [200]: makeStyle({
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  }),
  [300]: makeStyle({
    shadowColor: black,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 7,
    },
  }),
  [400]: makeStyle({
    shadowColor: black,
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {
      width: 8,
      height: 8,
    },
  }),
} as const;

const borderRadius = 20;
const borderWidth = 1;

const typography = {
  color: grey[900],
  secondaryColor: grey[600],
  presets: {
    massive: makeStyle({
      fontSize: 45,
      lineHeight: 55,
    }),
    h1: makeStyle({
      fontSize: 35,
      lineHeight: 41,
    }),
    h2: makeStyle({
      fontSize: 24,
      lineHeight: 33,
    }),
    h3: makeStyle({
      fontSize: 20,
      lineHeight: 25,
    }),
    h4: makeStyle({
      fontSize: 18,
      lineHeight: 19,
    }),
    p1: makeStyle({
      fontSize: 17,
    }),
    p2: makeStyle({
      fontSize: 14,
    }),
    small: makeStyle({
      fontSize: 12,
    }),
    tiny: makeStyle({
      fontSize: 10,
    }),
  },
};

export type SpaceKeys = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
type SpaceFn = (size: number) => number;
type Space = SpaceFn & Record<SpaceKeys, number>;

const spaceFn: SpaceFn = (size: number) => {
  return size * 3;
};

// @ts-ignore
const space: Space = spaceFn;
space.large = spaceFn(12);
space.xlarge = spaceFn(15);
space.medium = spaceFn(7);
space.small = spaceFn(4);
space.tiny = spaceFn(2);

export const BASE_THEME = {
  pallette,
  space,
  typography,
  borderRadius,
  borderWidth,
  presets: {
    shadows,
    centered: makeStyle({
      justifyContent: 'center',
      alignItems: 'center',
    }),
    input: makeStyle({
      borderWidth: borderWidth,
      borderRadius: borderRadius,
      borderColor: pallette.grey[200],
      borderStyle: 'solid',
    }),
    outlinedBox: makeStyle({
      borderColor: pallette.borderColor,
      borderWidth: borderWidth,
      borderRadius,
    }),
  },
};

export type Theme = typeof BASE_THEME;
