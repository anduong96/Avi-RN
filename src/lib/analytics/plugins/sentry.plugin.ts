import DeviceInfo from 'react-native-device-info';

import * as Sentry from '@sentry/react-native';

import { AnalyticPlugin } from '../types';

export class SentryPlugin extends AnalyticPlugin {
  error?(error: Error) {
    Sentry.captureException(error);
  }

  async identify() {
    const ipAddress = await DeviceInfo.getIpAddress();
    Sentry.setUser({
      id: this.user.id,
      ip_address: ipAddress || undefined,
      name: this.user.fullName,
    });
  }
}
