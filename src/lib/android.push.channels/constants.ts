import {
  type AndroidChannel,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

export enum AndroidPushChannel {
  FLIGHT = 'Flight',
}

type AndroidPushChannelsConfig = Record<AndroidPushChannel, AndroidChannel>;

export const ANDROID_PUSH_CHANNELS_CONFIG: AndroidPushChannelsConfig = {
  [AndroidPushChannel.FLIGHT]: {
    id: AndroidPushChannel.FLIGHT,
    importance: AndroidImportance.HIGH,
    lights: true,
    name: AndroidPushChannel.FLIGHT,
    vibration: true,
    visibility: AndroidVisibility.PUBLIC,
  },
};
