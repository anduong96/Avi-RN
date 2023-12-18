import React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import messaging from '@react-native-firebase/messaging';

import { useGlobalState } from '@app/state/global';
import { useHasHydrated } from '@app/state/use.has.hydrated';

import { useLogger } from '../logger/use.logger';

/**
 * The `useBootApp` function is a TypeScript function that uses React hooks to check if the user has
 * flights and if the app is ready to boot, and then calls the `bootApp` function when both conditions
 * are met.
 */
export function useBootApp() {
  const hasBooted = React.useRef(false);
  const canBoot = useGlobalState((s) => s._hasFinishStartup);
  const hasGlobalStateHydrated = useHasHydrated(useGlobalState);
  const logger = useLogger('useBootApp');

  React.useEffect(() => {
    if (hasGlobalStateHydrated) {
      logger.debug('Checking push notification permission');
      messaging()
        .hasPermission()
        .then((status) => {
          if (
            status === messaging.AuthorizationStatus.AUTHORIZED ||
            status === messaging.AuthorizationStatus.DENIED ||
            status === messaging.AuthorizationStatus.PROVISIONAL
          ) {
            useGlobalState.setState({
              pushPermission: status,
            });
          }
        });
    }
  }, [hasGlobalStateHydrated, logger]);

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
  }, [canBoot, logger, hasGlobalStateHydrated]);
}
