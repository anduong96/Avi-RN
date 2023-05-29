import './push.notification';
import './sentry';

import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';

import { ENV } from '@app/env';
import Smartlook from 'react-native-smartlook-analytics';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import { restoreGlobalState } from '@app/state/global';

function startSmartlook() {
  if (!ENV.SMARTLOOK_KEY) {
    return;
  }

  Smartlook.instance.preferences.setProjectKey(ENV.SMARTLOOK_KEY);
  Smartlook.instance.start();
}

export async function startup() {
  await Promise.allSettled([
    remoteConfig().fetchAndActivate(),
    restoreGlobalState(),
    startSmartlook(),
    auth().currentUser?.reload(),
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
