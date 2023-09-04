import { logger as Logger } from '../logger';
import type { Notification } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const logger = Logger.extend('[Notification]');

export async function handleFcmToken() {
  if (!__DEV__) {
    return;
  }

  logger.debug('Getting FCM Token');
  const fcmToken = await messaging().getToken();
  logger.debug({ fcmToken });
}

messaging().onMessage((data) => {
  logger.debug('Message received', { data });

  if (!data.notification) {
    return;
  }

  const payload: Notification = {
    id: data.messageId,
    title: data.notification.title,
    body: data.notification.body,
    data: data.data,
    remote: {
      messageId: data.messageId!,
      senderId: data.from!,
    },
  };

  if (data.data?.fcm_options?.image) {
    const imageUrl = data.data?.fcm_options?.image;
    payload.ios = {
      attachments: [
        {
          url: imageUrl,
        },
      ],
    };
  }

  notifee.displayNotification(payload);
});
