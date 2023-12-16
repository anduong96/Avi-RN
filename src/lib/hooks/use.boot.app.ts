import React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { useGlobalState } from '@app/state/global';
import { useHasHydrated } from '@app/state/use.has.hydrated';

import { createLogger } from '../logger';

const logger = createLogger('useBootApp');

/**
 * The `useBootApp` function is a TypeScript function that uses React hooks to check if the user has
 * flights and if the app is ready to boot, and then calls the `bootApp` function when both conditions
 * are met.
 */
export function useBootApp() {
  const hasBooted = React.useRef(false);
  const canBoot = useGlobalState((s) => s._hasFinishStartup);
  const hasGlobalStateHydrated = useHasHydrated(useGlobalState);

  React.useEffect(() => {
    if (hasBooted.current) {
      return;
    }

    logger.debug(
      'Checking if app can boot canBoot=%s, hasGlobalStateHydrated=%s, userFlightsLoaded=%s',
      canBoot,
      hasGlobalStateHydrated,
    );

    if (canBoot && hasGlobalStateHydrated) {
      logger.debug('Booting App');
      hasBooted.current = true;
      RNBootSplash.hide({
        fade: true,
      });
    }
  }, [canBoot, hasGlobalStateHydrated]);
}
