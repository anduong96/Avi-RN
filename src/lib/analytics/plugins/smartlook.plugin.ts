import Smartlook, { Properties } from 'react-native-smartlook-analytics';

import { AnalyticPlugin } from '../types';
import { ENV } from '@app/env';
import type { User } from '@app/generated/server.gql';
import { isNil } from 'lodash';

export class SmartlookPlugin extends AnalyticPlugin {
  constructor(protected readonly user: User) {
    super(user);
  }

  isEnabled() {
    return !isNil(ENV.SMARTLOOK_KEY);
  }

  private sendEvent<T extends object>(event: string, payload: T = {} as any) {
    const props = new Properties();
    for (const [key, value] of Object.entries(payload)) {
      if (!isNil(value)) {
        props.putString(key, String(value));
      }
    }

    Smartlook.instance.analytics.trackEvent(event, props);
  }

  identify() {
    Smartlook.instance.user.setIdentifier(this.user.id);
    this.user.fullName && Smartlook.instance.user.setName(this.user.fullName);
  }

  screen(screenName: string, attributes?: object) {
    this.sendEvent(`screen.${screenName}`, attributes);
  }

  track(eventName: string, attributes?: object) {
    this.sendEvent(eventName, attributes);
  }
}
