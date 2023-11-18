import type { DeepPartial } from '@apollo/client/utilities';

import { merge } from 'merge-anything';

import { BASE_THEME, blackColor } from './base.theme';

const theme: DeepPartial<typeof BASE_THEME> = {
  isDark: false,
  pallette: {
    background: BASE_THEME.pallette.white,
    borderColor: BASE_THEME.pallette.grey[700],
    card: blackColor.clone().lighten(97).toHexString(),
    dividerColor: BASE_THEME.pallette.grey[900],
    grey: {
      50: BASE_THEME.pallette.grey[900],
      100: BASE_THEME.pallette.grey[800],
      200: BASE_THEME.pallette.grey[700],
      300: BASE_THEME.pallette.grey[600],
      400: BASE_THEME.pallette.grey[500],
      500: BASE_THEME.pallette.grey[400],
      600: BASE_THEME.pallette.grey[300],
      700: BASE_THEME.pallette.grey[200],
      800: BASE_THEME.pallette.grey[100],
      900: BASE_THEME.pallette.grey[50],
    },
    text: BASE_THEME.pallette.grey[50],
    white: BASE_THEME.pallette.white,
  },
};

export const LIGHT_THEME = merge(BASE_THEME, theme);
