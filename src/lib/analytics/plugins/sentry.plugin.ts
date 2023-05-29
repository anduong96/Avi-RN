import * as Sentry from '@sentry/react-native';

import { AnalyticPlugin } from '../types';
import DeviceInfo from 'react-native-device-info';

export class SentryPlugin extends AnalyticPlugin {
  async identify() {
    const ipAddress = await DeviceInfo.getIpAddress();
    Sentry.setUser({
      name: this.user.fullName,
      id: this.user.id,
      ip_address: ipAddress || undefined,
    });
  }

  error?(error: Error) {
    Sentry.captureException(error);
  }
}
