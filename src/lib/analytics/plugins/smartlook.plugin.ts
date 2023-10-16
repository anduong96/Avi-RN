import Smartlook, { Properties } from 'react-native-smartlook-analytics';

import { isNil } from 'lodash';

import type { User } from '@app/generated/server.gql';

import { ENV } from '@app/env';

import { AnalyticPlugin } from '../types';

export class SmartlookPlugin extends AnalyticPlugin {
  constructor(protected readonly user: User) {
    super(user);
  }

  private sendEvent<T extends object>(event: string, payload: T = {} as T) {
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

  isEnabled() {
    return !isNil(ENV.SMARTLOOK_KEY);
  }

  screen(screenName: string, attributes?: object) {
    this.sendEvent(`screen.${screenName}`, attributes);
  }

  track(eventName: string, attributes?: object) {
    this.sendEvent(eventName, attributes);
  }
}
