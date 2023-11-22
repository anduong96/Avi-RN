import { tryNice } from 'try-nice';
import messaging from '@react-native-firebase/messaging';

import { logger } from '@app/lib/logger';
import { format } from '@app/lib/format';

import { useFlightNotificationsState } from '.';

export function disableFlightPush(flightID: string) {
  const state = useFlightNotificationsState.getState();
  const current = state.getFlightPush(flightID);
  current.pushEnabled = false;
  state.setFlightPush(flightID, current);
  tryNice(() => messaging().unsubscribeFromTopic(flightID));
  logger.warn(format('Disabled push notifications for flight[%s]', flightID));
}
