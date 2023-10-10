import './sentry';
import '@app/state/user';
import './push.notification';

import * as React from 'react';

import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';

import { ENV } from '@app/env';
import { GlobalState } from '@app/state/global';

import { startSmartlook } from './smart.look';
import { handleBuildInfo } from './build.info';
import { handleFcmToken } from './push.notification';

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
        logLevel: __DEV__ ? RUDDER_LOG_LEVEL.DEBUG : RUDDER_LOG_LEVEL.NONE,
        recordScreenViews: false,
        trackAppLifecycleEvents: true,
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
