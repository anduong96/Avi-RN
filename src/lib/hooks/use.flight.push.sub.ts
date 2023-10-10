import * as React from 'react';

import { FlightPushSubState } from '@app/state/flight.push.sub';
import { useGetUserActiveFlightsQuery } from '@app/generated/server.gql';

import { logger } from '../logger';
import { findArrayDifferences } from '../array/find.difference';

export function useFlightPushSub() {
  const isReady = FlightPushSubState.useSelect((s) => s.isReady);
  const { data } = useGetUserActiveFlightsQuery();

  React.useEffect(() => {
    if (!data?.userActiveFlights || !isReady) {
      return;
    }

    const subscriptions = FlightPushSubState.getState().subscriptions;
    const subscribedFlightIDs = data.userActiveFlights
      .filter((entry) => entry.shouldAlert)
      .map((entry) => entry.flightID);

    const diff = findArrayDifferences(
      Object.keys(subscriptions),
      subscribedFlightIDs,
    );

    logger.debug('User Flights Diff', diff);

    for (const entry of diff.added) {
      FlightPushSubState.actions.enablePush(entry);
    }

    for (const entry of diff.removed) {
      FlightPushSubState.actions.removeFlight(entry);
    }
  }, [data, isReady]);
}
