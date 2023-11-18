import { useColorScheme } from 'react-native';

import { useGlobalState } from '@app/state/global';
import { ThemePreset } from '@app/themes/constants';

import { DARK_THEME } from '../../themes/dark.theme';
import { LIGHT_THEME } from '../../themes/light.theme';

/**
 * It returns a theme object based on the current color scheme
 * @returns A function that returns a theme object.
 */
export function useTheme() {
  const scheme = useColorScheme();
  const theme = useGlobalState((s) => s.theme);
  const isDarkTheme =
    theme === ThemePreset.SYSTEM
      ? scheme === 'dark'
      : theme === ThemePreset.DARK;

  return isDarkTheme ? DARK_THEME : LIGHT_THEME;
}

export function useIsDarkTheme() {
  const theme = useTheme();
  return theme.isDark;
}
