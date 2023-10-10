import type { Notification } from '@notifee/react-native';

import * as React from 'react';
import { Linking } from 'react-native';

import { isEmpty } from 'lodash';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import { logger as Logger } from '../logger';
import { useAppActive } from '../hooks/use.app.state';

const logger = Logger.extend('[Notification]');

export async function handleFcmToken() {
  if (!__DEV__) {
    return;
  }

  logger.debug('Getting FCM Token');
  const fcmToken = await messaging().getToken();
  logger.debug({ fcmToken });
}

export function useNotificationHandling() {
  const appIsActive = useAppActive();

  const handleInitialNotification = React.useCallback(
    async (isActive: boolean) => {
      if (!isActive) {
        return;
      }

      const event = await notifee.getInitialNotification();
      if (isEmpty(event)) {
        return;
      }

      const urlToOpen = event?.notification.data?.url as string;
      if (urlToOpen) {
        const canOpen = await Linking.canOpenURL(urlToOpen);
        if (canOpen) {
          await Linking.openURL(urlToOpen);
        }
      }
    },
    [],
  );

  React.useEffect(() => {
    handleInitialNotification(appIsActive);
  }, [handleInitialNotification, appIsActive]);
}

messaging().onMessage((data) => {
  logger.debug('Message received', { data });

  if (!data.notification) {
    return;
  }

  const payload: Notification = {
    body: data.notification.body,
    data: data.data,
    id: data.messageId,
    remote: {
      messageId: data.messageId!,
      senderId: data.from!,
    },
    title: data.notification.title,
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

// notifee.onBackgroundEvent(async (e) => {
//   logger.debug(e);
// });

// messaging().onNotificationOpenedApp((message) => {
//   logger.debug('Opened notification', message);
// });
