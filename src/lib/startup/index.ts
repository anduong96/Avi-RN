import './sentry';
import './push.notification';

import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';

import { ENV } from '@app/env';

import { logger } from '../logger';
import { format } from '../format';
import { handleBuildInfo } from './build.info';
import { handleFcmToken } from './push.notification';

if (__DEV__) {
  logger.extend('ENV').debug(ENV);
}

export async function startup() {
  await Promise.allSettled([
    remoteConfig()
      .fetch(1000)
      .then(() => remoteConfig().activate())
      .then((configFetched) => {
        logger.debug(
          format(
            'Remote config fetched=%s status=%s app=%s appID=%s config=%o',
            configFetched,
            remoteConfig().lastFetchStatus,
            remoteConfig().app.options.projectId,
            remoteConfig().app.options.appId,
            Object.entries(remoteConfig().getAll()),
          ),
        );
      }),
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
