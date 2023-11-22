import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import type {
  Notification,
  NotificationAndroid,
  NotificationIOS,
} from '@notifee/react-native';

import * as React from 'react';
import { Linking } from 'react-native';

import { isEmpty } from 'lodash';
import { merge } from 'merge-anything';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidVisibility } from '@notifee/react-native';

import { logger as Logger } from '../logger';
import { IS_ANDROID, IS_IOS } from '../platform';
import { useAppActive } from '../hooks/use.app.state';
import { AndroidPushChannel } from '../android.push.channels/constants';

const logger = Logger.getSubLogger('Notification');

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
        logger.debug('No initial notification');
        return;
      }

      const urlToOpen =
        typeof event?.notification.data?.url === 'string'
          ? event.notification.data.url
          : undefined;

      logger.debug('Initial notification', {
        event,
        urlToOpen,
      });

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

function modForAndroidMessage(payload: Notification) {
  if (!IS_ANDROID) {
    return;
  }

  //TODO: handle more channels
  payload.android = {
    channelId: AndroidPushChannel.FLIGHT,
    visibility: AndroidVisibility.PUBLIC,
  };
}

function modForFcmImage(
  payload: Notification,
  data: FirebaseMessagingTypes.RemoteMessage,
) {
  const fcmOptions = data.data?.fcm_options;
  const isFcmObject = typeof fcmOptions === 'object';
  const fcmImage =
    isFcmObject && 'image' in fcmOptions && typeof fcmOptions.image === 'string'
      ? fcmOptions.image
      : undefined;

  if (!fcmImage) {
    return;
  }

  logger.debug('fcmImage=%s', fcmImage);
  if (IS_IOS) {
    const iosAttachments: NotificationIOS = {
      attachments: [
        {
          id: 'fcmImage',
          url: fcmImage,
        },
      ],
    };

    payload.ios = merge(iosAttachments, payload.ios);
  } else if (IS_ANDROID) {
    const androidAttachments: NotificationAndroid = {
      largeIcon: fcmImage,
    };

    payload.android = merge(androidAttachments, payload.android);
  }
}

function handleMessage(data: FirebaseMessagingTypes.RemoteMessage) {
  logger.debug('Message received data=%j', data);
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

  modForFcmImage(payload, data);
  modForAndroidMessage(payload);

  logger.debug('displaying notification payloadID=%s', payload.id);
  notifee.displayNotification(payload);
}

function handleNotificationOpenedApp(
  notification: FirebaseMessagingTypes.RemoteMessage,
) {
  logger.debug('Opened notification', notification);
}

messaging().onMessage(handleMessage);
messaging().onNotificationOpenedApp(handleNotificationOpenedApp);
