import type { BlurViewProps } from '@react-native-community/blur';

import tinycolor from 'tinycolor2';

import { logger } from '@app/lib/logger';
import { IS_ANDROID } from '@app/lib/platform';
import { useTheme } from '@app/lib/hooks/use.theme';

/**
 * Generates the overlay color based on the blurType parameter.
 *
 * @param {BlurViewProps['blurType']} blurType - The type of blur for the overlay color.
 * @returns {string} The overlay color in RGBA format.
 */
export function useOverlayColor(blurType: BlurViewProps['blurType']) {
  const theme = useTheme();

  if (!IS_ANDROID) {
    logger.warn('useOverlayColor is only available on Android');
    return undefined;
  }

  switch (blurType) {
    case 'light':
      return tinycolor(theme.pallette.grey[500]).setAlpha(0.5).toRgbString();
    case 'xlight':
      return tinycolor(theme.pallette.grey[900]).setAlpha(0.5).toRgbString();
    case 'dark':
      return tinycolor(theme.pallette.grey[100]).setAlpha(0.5).toRgbString();
    default:
      return 'transparent';
  }
}
