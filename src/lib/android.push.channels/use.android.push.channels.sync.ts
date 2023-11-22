import * as React from 'react';

import notifee from '@notifee/react-native';
import { isEqual, keyBy, uniq } from 'lodash';

import type { AndroidPushChannel } from './constants';

import { logger } from '../logger';
import { IS_ANDROID } from '../platform';
import { ANDROID_PUSH_CHANNELS_CONFIG } from './constants';

export function useAndroidPushChannelsSync() {
  const syncChannels = React.useCallback(async () => {
    if (!IS_ANDROID) {
      return;
    }

    const channels = await notifee.getChannels();
    const currentChannels = keyBy(channels, (entry) => entry.id);
    const configChannelsKeys = Object.keys(ANDROID_PUSH_CHANNELS_CONFIG);
    const allChannels = uniq(
      configChannelsKeys.concat(Object.keys(currentChannels)),
    );

    for (const channelID of allChannels) {
      const channelIDEnum = channelID as AndroidPushChannel;
      const currentConfig = ANDROID_PUSH_CHANNELS_CONFIG[channelIDEnum];
      const savedConfig = currentChannels[channelID];

      if (!savedConfig && currentConfig) {
        logger.debug('Creating channel channelID=%s', channelID);
        await notifee.createChannel(currentConfig);
      } else if (savedConfig && !currentConfig) {
        logger.debug('Deleting channel channelID=%s', channelID);
        await notifee.deleteChannel(channelID);
      } else if (!isEqual(savedConfig, currentConfig)) {
        logger.debug('Replacing channel channelID=%s', channelID);
        await notifee.deleteChannel(channelID);
        await notifee.createChannel(currentConfig);
      } else {
        logger.debug('Noting changed channelID=%s', channelID);
      }
    }
  }, []);

  React.useEffect(() => {
    syncChannels();
  }, [syncChannels]);
}
