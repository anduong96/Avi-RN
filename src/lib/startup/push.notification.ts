import { logger as Logger } from '../logger';
import notifee from '@notifee/react-native';

const logger = Logger.extend('[Notification]');

notifee.onBackgroundEvent(async (event) => {
  logger.debug('onBackgroundEvent', event);

  if (event.detail.notification) {
    notifee.displayNotification(event.detail.notification);
  }
});

notifee.onForegroundEvent(async (event) => {
  logger.debug('onForegroundEvent', event);
});
