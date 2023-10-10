import DeviceInfo from 'react-native-device-info';

import { isNil } from 'lodash';
import rudderClient from '@rudderstack/rudder-sdk-react-native';

import { ENV } from '@app/env';

import { AnalyticPlugin } from '../types';

export class RudderstackPlugin extends AnalyticPlugin {
  identify(): void {
    rudderClient.identify(
      this.user.id,
      {
        batteryLevel: DeviceInfo.getBatteryLevelSync(),
        carrier: DeviceInfo.getCarrierSync(),
        device: DeviceInfo.getDeviceSync(),
        deviceId: DeviceInfo.getDeviceId(),
        deviceName: DeviceInfo.getDeviceNameSync(),
        disk: DeviceInfo.getFreeDiskStorageSync(),
        displayName: this.user.fullName,
        email: this.user.email,
        fingerPrint: DeviceInfo.getFingerprintSync(),
        ipAddress: DeviceInfo.getIpAddressSync(),
        profileURL: this.user.profileImageURL,
      },
      {},
    );
  }

  isEnabled() {
    return !isNil(ENV.RUDDER_STACK_KEY);
  }

  screen(
    screenName: string,
    attributes?: Record<string, unknown> | undefined,
  ): void {
    rudderClient.screen(screenName, attributes);
  }

  track(eventName: string, attributes?: Record<string, unknown>): void {
    rudderClient.track(eventName, attributes);
  }
}
