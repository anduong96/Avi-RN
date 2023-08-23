import * as React from 'react';

import { FlightPushSubState } from '@app/state/flight.push.sub';
import { compact } from 'lodash';
import { findArrayDifferences } from '../array/find.difference';
import { logger } from '../logger';
import { useGetUserFlightsQuery } from '@app/generated/server.gql';

export function useFlightPushSub() {
  const { data } = useGetUserFlightsQuery();

  React.useEffect(() => {
    if (!data?.userFlights) {
      return;
    }

    const subscriptions = FlightPushSubState.getState().subscriptions;
    const subscribedFlightIDs = compact(
      data.userFlights.map((entry) =>
        entry.shouldAlert ? entry.flightID : null,
      ),
    );

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
