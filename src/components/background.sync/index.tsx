import * as React from 'react';
import { useColorScheme } from 'react-native';

import { useStartup } from '@app/lib/startup/use.startup';
import { useUserSync } from '@app/state/user/use.user.sync';
import { useAppStateSync } from '@app/lib/hooks/use.app.state';
import { useFirstOpenSync } from '@app/lib/hooks/use.first.opened';
import { useNotificationHandling } from '@app/lib/startup/push.notification';
import { useFlightPushSync } from '@app/state/flights.notifications/use.flight.push';
import { useAndroidPushChannelsSync } from '@app/lib/android.push.channels/use.android.push.channels.sync';

export const BackgroundSync: React.FC = () => {
  useUserSync();
  useFlightPushSync();
  useStartup();
  useFirstOpenSync();
  useColorScheme();
  useAppStateSync();
  useNotificationHandling();
  useAndroidPushChannelsSync();

  return <></>;
};
