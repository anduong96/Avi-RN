import Smartlook from 'react-native-smartlook-analytics';

import { ENV } from '@app/env';

export function startSmartlook() {
  if (!ENV.SMARTLOOK_KEY) {
    return;
  }

  Smartlook.instance.preferences.setProjectKey(ENV.SMARTLOOK_KEY);
  Smartlook.instance.start();
}
