import * as React from 'react';
import { useColorScheme } from 'react-native';

import { DARK_THEME } from '../../themes/dark.theme';
import { LIGHT_THEME } from '../../themes/light.theme';

/**
 * It returns a theme object based on the current color scheme
 * @returns A function that returns a theme object.
 */
export function useTheme() {
  const scheme = useColorScheme();
  return React.useMemo(
    () => (scheme === 'dark' ? DARK_THEME : LIGHT_THEME),
    [scheme],
  );
}
