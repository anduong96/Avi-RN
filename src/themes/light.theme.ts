import type { DeepPartial } from '@apollo/client/utilities';

import { merge } from 'merge-anything';

import { IS_ANDROID } from '@app/lib/platform';

import type { Theme } from './base.theme';

import { BASE_THEME, blackColor } from './base.theme';

const grey: Theme['pallette']['grey'] = {
  50: blackColor
    .clone()
    .lighten(IS_ANDROID ? 97 : 95)
    .toHexString(),
  100: blackColor.clone().lighten(90).toHexString(),
  200: blackColor.clone().lighten(80).toHexString(),
  300: blackColor.clone().lighten(70).toHexString(),
  400: blackColor.clone().lighten(60).toHexString(),
  500: blackColor.clone().lighten(50).toHexString(),
  600: blackColor.clone().lighten(40).toHexString(),
  700: blackColor.clone().lighten(30).toHexString(),
  800: blackColor.clone().lighten(10).toHexString(),
  900: blackColor.clone().lighten(7).toHexString(),
};

const theme: DeepPartial<Theme> = {
  isDark: false,
  pallette: {
    background: BASE_THEME.pallette.white,
    borderColor: grey[100],
    card: blackColor.clone().lighten(97).toHexString(),
    dividerColor: grey[100],
    grey: grey,
    text: grey[900],
    white: BASE_THEME.pallette.white,
  },
};

export const LIGHT_THEME = merge(BASE_THEME, theme);
