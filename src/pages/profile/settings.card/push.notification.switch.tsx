import * as React from 'react';
import { ActivityIndicator, Switch } from 'react-native';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

import { useQuery } from '@tanstack/react-query';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { logger } from '@app/lib/logger';
import { useGlobalState } from '@app/state/global';
import { useToast } from '@app/components/toast/use.toast';

export const PushNotificationSwitch: React.FC = () => {
  const toast = useToast();
  const permission = useQuery({
    queryFn: () => checkNotifications(),
    queryKey: ['permission', 'notification'],
  });

  const handleChange = async () => {
    if (permission.data?.status !== 'granted') {
      try {
        await requestNotifications(['alert', 'badge', 'sound']);
        await permission.refetch();
      } catch (error) {
        logger.error('Failed to request notifications', error);
        toast({
          preset: 'error',
          title: 'Unable to change',
        });
      }
    } else {
      useGlobalState.setState({
        pushPermission:
          FirebaseMessagingTypes.AuthorizationStatus.NOT_DETERMINED,
      });
    }
  };

  if (permission.isLoading) {
    return <ActivityIndicator size="small" />;
  }

  return (
    <Switch
      onChange={handleChange}
      value={permission.data?.status === 'granted'}
    />
  );
};
