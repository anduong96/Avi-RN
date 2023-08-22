import { ENV } from '@app/env';
import Smartlook from 'react-native-smartlook-analytics';

export function startSmartlook() {
  if (!ENV.SMARTLOOK_KEY) {
    return;
  }

  Smartlook.instance.preferences.setProjectKey(ENV.SMARTLOOK_KEY);
  Smartlook.instance.start();
}
