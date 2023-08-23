import '@app/state/user';
import './push.notification';
import './sentry';

import * as React from 'react';

import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';

import { ENV } from '@app/env';
import { GlobalState } from '@app/state/global';
import auth from '@react-native-firebase/auth';
import { handleBuildInfo } from './build.info';
import { handleFcmToken } from './push.notification';
import remoteConfig from '@react-native-firebase/remote-config';
import { startSmartlook } from './smart.look';

export async function startup() {
  await Promise.allSettled([
    remoteConfig().fetchAndActivate(),
    startSmartlook(),
    handleFcmToken(),
    handleBuildInfo(),
    auth().currentUser
      ? auth().currentUser?.reload()
      : auth().signInAnonymously(),
    ENV.RUDDER_STACK_KEY &&
      ENV.RUDDER_STACK_DATAPLANE_URL &&
      rudderClient.setup(ENV.RUDDER_STACK_KEY, {
        dataPlaneUrl: ENV.RUDDER_STACK_DATAPLANE_URL,
        trackAppLifecycleEvents: true,
        recordScreenViews: false,
        logLevel: __DEV__ ? RUDDER_LOG_LEVEL.DEBUG : RUDDER_LOG_LEVEL.NONE,
      }),
  ]);
}

export function useStartupPrep() {
  React.useEffect(() => {
    startup().finally(() => {
      GlobalState.actions.setIsStartUpFinish();
    });
  }, []);
}
