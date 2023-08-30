import * as React from 'react';

import {
  FlightStatus,
  useGetUserFlightsQuery,
} from '@app/generated/server.gql';

import { FlightPushSubState } from '@app/state/flight.push.sub';
import { findArrayDifferences } from '../array/find.difference';
import { logger } from '../logger';

export function useFlightPushSub() {
  const { data } = useGetUserFlightsQuery();

  React.useEffect(() => {
    if (!data?.userFlights) {
      return;
    }

    const subscriptions = FlightPushSubState.getState().subscriptions;
    const subscribedFlightIDs = data.userFlights
      .filter(
        (entry) =>
          entry.flight.status !== FlightStatus.ARCHIVED && entry.shouldAlert,
      )
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
