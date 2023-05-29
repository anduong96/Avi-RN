import { AnalyticPlugin } from '../types';
import DeviceInfo from 'react-native-device-info';
import { ENV } from '@app/env';
import { isNil } from 'lodash';
import rudderClient from '@rudderstack/rudder-sdk-react-native';

export class RudderstackPlugin extends AnalyticPlugin {
  isEnabled() {
    return !isNil(ENV.RUDDER_STACK_KEY);
  }

  track(eventName: string, attributes?: Record<string, unknown>): void {
    rudderClient.track(eventName, attributes);
  }

  screen(
    screenName: string,
    attributes?: Record<string, unknown> | undefined,
  ): void {
    rudderClient.screen(screenName, attributes);
  }

  identify(): void {
    rudderClient.identify(
      this.user.id,
      {
        email: this.user.email,
        profileURL: this.user.profileImageURL,
        displayName: this.user.fullName,
        batteryLevel: DeviceInfo.getBatteryLevelSync(),
        carrier: DeviceInfo.getCarrierSync(),
        deviceName: DeviceInfo.getDeviceNameSync(),
        deviceId: DeviceInfo.getDeviceId(),
        device: DeviceInfo.getDeviceSync(),
        fingerPrint: DeviceInfo.getFingerprintSync(),
        disk: DeviceInfo.getFreeDiskStorageSync(),
        ipAddress: DeviceInfo.getIpAddressSync(),
      },
      {},
    );
  }
}
