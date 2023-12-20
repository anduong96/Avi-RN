import * as permissions from 'react-native-permissions';

import { IS_IOS } from '../platform';

export async function checkTrackingPermission() {
  if (IS_IOS) {
    const result = await permissions.check(
      permissions.PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    );

    if (result === permissions.RESULTS.DENIED) {
      await permissions.request(
        permissions.PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
      );
    }
  }
}
