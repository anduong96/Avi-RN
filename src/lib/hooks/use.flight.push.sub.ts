import * as React from 'react';

import { FlightPushSubState } from '@app/state/flight.push.sub';
import { findArrayDifferences } from '../array/find.difference';
import { logger } from '../logger';
import { useGetUserActiveFlightsQuery } from '@app/generated/server.gql';

export function useFlightPushSub() {
  const { data } = useGetUserActiveFlightsQuery();

  React.useEffect(() => {
    if (!data?.userActiveFlights) {
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
  }, [data]);
}
