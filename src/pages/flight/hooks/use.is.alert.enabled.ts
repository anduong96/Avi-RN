import { useFlightNotificationsState } from '@app/state/flights.notifications';

import { useFlightID } from '../context';

export function useIsAlertEnabled() {
  const flightID = useFlightID();
  const notification = useFlightNotificationsState((s) =>
    s.getFlightPush(flightID),
  );

  return notification.pushEnabled;
}
