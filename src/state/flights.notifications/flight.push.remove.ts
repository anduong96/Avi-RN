import { tryNice } from 'try-nice';
import messaging from '@react-native-firebase/messaging';

import { logger } from '@app/lib/logger';
import { format } from '@app/lib/format';

import { useFlightNotificationsState } from '.';

export function removeFlightPush(flightID: string) {
  const state = useFlightNotificationsState.getState();
  state.removeFlightPush(flightID);
  tryNice(() => messaging().unsubscribeFromTopic(flightID));
  logger.warn(format('Removed push notifications for flight[%s]', flightID));
}
