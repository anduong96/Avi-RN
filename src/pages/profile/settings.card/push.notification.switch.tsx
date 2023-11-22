import * as React from 'react';
import { ActivityIndicator, Switch } from 'react-native';
import {
  checkNotifications,
  openSettings,
  requestNotifications,
} from 'react-native-permissions';

import moment from 'moment';
import { useQuery } from '@tanstack/react-query';

import { logger } from '@app/lib/logger';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { useToast } from '@app/components/toast/use.toast';
import { usePrompt } from '@app/components/prompt/use.prompt';

export const PushNotificationSwitch: React.FC = () => {
  const prompt = usePrompt();
  const toast = useToast();
  const theme = useTheme();
  const permission = useQuery({
    queryFn: () => checkNotifications(),
    queryKey: ['permission', 'notification'],
  });
  const status = permission.data?.status;
  const hasPermission = status === 'granted';

  const handleChange = async () => {
    logger.debug('Changing push notification permission', { status });
    if (!hasPermission) {
      try {
        await requestNotifications(['alert', 'badge', 'sound']);
        await permission.refetch();
      } catch (error) {
        logger.error('Failed to request notifications', error);
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
