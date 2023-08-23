import device from 'react-native-device-info';
import { logger } from '../logger';

export async function handleBuildInfo() {
  if (!__DEV__) {
    return;
  }

  const bundleID = device.getBundleId();
  logger.extend('[BUILD]').debug({
    bundleID,
  });
}
