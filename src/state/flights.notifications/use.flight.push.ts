import * as React from 'react';

import { isEmpty, isNil } from 'lodash';

import { logger } from '@app/lib/logger';
import { findArrayDifferences } from '@app/lib/array/find.difference';
import {
  type Flight,
  useUserActiveFlightsQuery,
} from '@app/generated/server.gql';

import { useFlightNotificationsState } from '.';
import { useHasHydrated } from '../use.has.hydrated';
import { enableFlightPush } from './flight.push.enable';
import { removeFlightPush } from './flight.push.remove';

export function useFlightPush(flightID: Flight['id']) {
  return useFlightNotificationsState((state) => state.getFlightPush(flightID));
}

export function useFlightPushSync() {
  const isHydrated = useHasHydrated(useFlightNotificationsState);
  const { data } = useUserActiveFlightsQuery();
  const activeFlights = data?.userActiveFlights;
  const isReady = isHydrated && !isNil(activeFlights);

  React.useEffect(() => {
    if (!isReady) {
      return;
    }

    const subscriptions = useFlightNotificationsState.getState().subscriptions;
    const subscribedFlightIDs = activeFlights
      .filter((entry) => entry.shouldAlert)
      .map((entry) => entry.flightID);

    if (!isEmpty(subscribedFlightIDs)) {
      logger.debug('Subscribed Flights=%j', subscribedFlightIDs);
    }

    const diff = findArrayDifferences(
      Object.keys(subscriptions),
      subscribedFlightIDs,
    );

    if (!isEmpty(diff.added) || !isEmpty(diff.removed)) {
      logger.debug('User Flights Diff=%j', diff);
    }

    diff.added?.forEach((flightID) => enableFlightPush(flightID));
    diff.removed?.forEach((flightID) => removeFlightPush(flightID));
  }, [isReady, activeFlights]);
}
