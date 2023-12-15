import React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { isNil } from 'lodash';

import { useGlobalState } from '@app/state/global';
import { useHasHydrated } from '@app/state/use.has.hydrated';
import { useUserHasFlightsQuery } from '@app/generated/server.gql';

import { createLogger } from '../logger';

const logger = createLogger('useBootApp');

/**
 * The `useBootApp` function is a TypeScript function that uses React hooks to check if the user has
 * flights and if the app is ready to boot, and then calls the `bootApp` function when both conditions
 * are met.
 */
export function useBootApp() {
  const hasBooted = React.useRef(false);
  const userFlights = useUserHasFlightsQuery({ fetchPolicy: 'network-only' });
  const userFlightsLoaded = !isNil(userFlights.data?.userHasFlights);
  const canBoot = useGlobalState((s) => s._hasFinishStartup);
  const hasGlobalStateHydrated = useHasHydrated(useGlobalState);

  React.useEffect(() => {
    logger.debug(
      'Checking if app can boot canBoot=%s, hasGlobalStateHydrated=%s, userFlightsLoaded=%s',
      canBoot,
      hasGlobalStateHydrated,
      userFlightsLoaded,
    );

    if (canBoot && hasGlobalStateHydrated && userFlightsLoaded) {
      logger.debug('Booting App');
      hasBooted.current = true;
      RNBootSplash.hide({ fade: true });
    }
  }, [canBoot, userFlightsLoaded, hasGlobalStateHydrated]);
}
