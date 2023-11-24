import device from 'react-native-device-info';

import installation from '@react-native-firebase/installations';

import { logger } from '../logger';

export async function handleBuildInfo() {
  if (!__DEV__) {
    return;
  }

  const installID = await installation().getId();
  const bundleID = device.getBundleId();
  logger.getSubLogger('BUILD').debug({
    bundleID,
    installID,
  });
}
