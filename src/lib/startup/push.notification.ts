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

      const urlToOpen =
        typeof event?.notification.data?.url === 'string'
          ? event.notification.data.url
          : undefined;

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

  const fcmOptions = data.data?.fcm_options;
  const isFcmObject = typeof fcmOptions === 'object';
  const fcmImage =
    isFcmObject && 'image' in fcmOptions && typeof fcmOptions.image === 'string'
      ? fcmOptions.image
      : undefined;

  if (fcmImage) {
    payload.ios = {
      attachments: [
        {
          url: fcmImage,
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
