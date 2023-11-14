import { tryNice } from 'try-nice';
import { firebase } from '@react-native-firebase/messaging';

import { logger } from '@app/lib/logger';
import { format } from '@app/lib/format';

import { useFlightNotificationsState } from '.';

export function enableFlightPush(flightID: string) {
  const state = useFlightNotificationsState.getState();
  const current = state.getFlightPush(flightID);
  current.pushEnabled = true;
  state.setFlightPush(flightID, current);
  tryNice(() => firebase.messaging().subscribeToTopic(flightID));
  logger.warn(format('Enabled push notifications for flight[%s]', flightID));
}
