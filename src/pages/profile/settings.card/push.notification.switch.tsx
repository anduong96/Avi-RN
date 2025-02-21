import * as React from 'react';
import { openSettings } from 'react-native-permissions';
import { ActivityIndicator, Switch } from 'react-native';

import type { SwitchProps } from 'react-native';

import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';

import { logger } from '@app/lib/logger';
import { vibrate } from '@app/lib/haptic.feedback';
import { useGlobalState } from '@app/state/global';
import { useTheme } from '@app/lib/hooks/use.theme';
import { useToast } from '@app/components/toast/use.toast';
import { usePrompt } from '@app/components/prompt/use.prompt';

export const PushNotificationSwitch: React.FC = () => {
  const prompt = usePrompt();
  const toast = useToast();
  const theme = useTheme();
  const permission = useQuery({
    queryFn: () => messaging().hasPermission(),
    queryKey: ['permission', 'notification'],
  });
  const status = permission.data;
  const hasPermission = status === messaging.AuthorizationStatus.AUTHORIZED;

  const handleChange: SwitchProps['onChange'] = async () => {
    logger.debug('Changing push notification permission', {
      status,
    });

    if (!hasPermission) {
      try {
        await messaging().requestPermission({
          alert: true,
          announcement: true,
          carPlay: true,
          sound: true,
        });
        const newStatus = await permission.refetch();
        if (newStatus.data !== messaging.AuthorizationStatus.AUTHORIZED) {
          throw new Error();
        }

        useGlobalState.setState({
          pushPermission: newStatus.data,
        });
      } catch (error) {
        prompt({
          acceptStatus: 'active',
          acceptText: 'Open Settings',
          description: 'Unable to change push notification permission',
          onAccept: () => {
            vibrate('effectClick');
            openSettings();
          },
          title: 'Error!',
        });
      }
    } else {
      toast({
        description:
          'Please go to system settings to disable push notifications',
        durationMs: moment.duration({ seconds: 5 }).as('ms'),
        preset: 'error',
        title: 'Error!',
      });
    }
  };

  if (permission.isLoading) {
    return <ActivityIndicator size="small" />;
  }

  return (
    <Switch
      ios_backgroundColor={theme.pallette.active}
      onChange={handleChange}
      value={hasPermission}
    />
  );
};
