import React from 'react';

import { isNil } from 'lodash';

import { useGlobalState } from '@app/state/global';
import { useUserHasFlightsQuery } from '@app/generated/server.gql';

import { bootApp } from '../boot.app';

/**
 * The `useBootApp` function is a TypeScript function that uses React hooks to check if the user has
 * flights and if the app is ready to boot, and then calls the `bootApp` function when both conditions
 * are met.
 */
export function useBootApp() {
  const userFlights = useUserHasFlightsQuery({ fetchPolicy: 'cache-only' });
  const userFlightsLoaded = !isNil(userFlights.data?.userHasFlights);
  const canBoot = useGlobalState((s) => s.hasFinishStartup && s._hasHydrated);

  React.useEffect(() => {
    if (canBoot && userFlightsLoaded) {
      bootApp();
    }
  }, [canBoot, userFlightsLoaded]);
}
