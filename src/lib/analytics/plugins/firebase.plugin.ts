import { AnalyticPlugin } from '../types';
import { ENV } from '@app/env';
import type { User } from '@app/generated/server.gql';
import analytics from '@react-native-firebase/analytics';

export class FirebasePlugin extends AnalyticPlugin {
  constructor(protected readonly user: User) {
    super(user);
  }

  isEnabled() {
    return ENV.APP_ENV === 'production';
  }

  identify() {
    analytics().setUserId(this.user.id);
  }
}
