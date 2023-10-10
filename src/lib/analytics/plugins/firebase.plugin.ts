import analytics from '@react-native-firebase/analytics';

import type { User } from '@app/generated/server.gql';

import { ENV } from '@app/env';

import { AnalyticPlugin } from '../types';

export class FirebasePlugin extends AnalyticPlugin {
  constructor(protected readonly user: User) {
    super(user);
  }

  identify() {
    analytics().setUserId(this.user.id);
  }

  isEnabled() {
    return ENV.APP_ENV === 'production';
  }
}
