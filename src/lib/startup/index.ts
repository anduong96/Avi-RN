import './sentry';
import './push.notification';

import * as Sentry from '@sentry/react-native';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';

import { ENV } from '@app/env';

import { logger } from '../logger';
import { format } from '../format';
import { signOut } from '../auth/sign.out';
import { handleBuildInfo } from './build.info';

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
            Object.keys(remoteConfig().getAll()),
          ),
        );
      }),
    Sentry.setExtra('SERVER', ENV.SERVER),
    handleBuildInfo(),
    auth().currentUser
      ? auth()
          .currentUser?.reload()
          .catch(() => signOut())
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
