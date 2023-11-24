import * as React from 'react';
import { useColorScheme } from 'react-native';

import { useGlobalState } from '@app/state/global';
import { ThemePreset } from '@app/themes/constants';
import { DARK_THEME, LIGHT_THEME } from '@app/themes';

/**
 * It returns a theme object based on the current color scheme
 * @returns A function that returns a theme object.
 */
export function useTheme() {
  return useGlobalState((s) => s._theme);
}

export function useIsDarkTheme() {
  return useTheme().isDark;
}

/**
 * The `useThemeSync` function updates the global state with the appropriate theme based on the color
 * scheme and selected theme preset.
 */
export function useThemeSync() {
  const scheme = useColorScheme();
  const theme = useGlobalState((s) => s.theme);

  /**
   * Use memo so it run before every render
   */
  React.useMemo(() => {
    useGlobalState.setState({
      _theme:
        theme === ThemePreset.SYSTEM
          ? scheme === 'dark'
            ? DARK_THEME
            : LIGHT_THEME
          : theme === ThemePreset.DARK
            ? DARK_THEME
            : LIGHT_THEME,
    });
  }, [theme, scheme]);
}
