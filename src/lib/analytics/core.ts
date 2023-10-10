import { compact } from 'lodash';
import { tryNice } from 'try-nice';

import type { User } from '@app/generated/server.gql';

import { ENV } from '@app/env';

import type { AnalyticPlugin } from './types';

import { logger } from '../logger';
import { SentryPlugin } from './plugins/sentry.plugin';
import { FirebasePlugin } from './plugins/firebase.plugin';
import { SmartlookPlugin } from './plugins/smartlook.plugin';
import { RudderstackPlugin } from './plugins/rudder.stack.plugin';

export class Analytics {
  private static logger = logger.extend('Analytics');
  private static options = compact([
    FirebasePlugin,
    SentryPlugin,
    RudderstackPlugin,
    SmartlookPlugin,
  ]);
  private static plugins: AnalyticPlugin[] = [];
  private static user?: User;

  static error<T extends Error, C extends Record<string, unknown>>(
    error: T,
    context?: C,
  ) {
    this.publish('error', error, context, this.user);
  }

  static identify(user: User) {
    this.logger.debug('Identify', user.id);
    this.user = user;
    this.plugins = this.options.map((Plugin) => new Plugin(user));
  }

  static registerPush() {
    this.publish('registerPush');
  }

  static screen<T extends Record<string, unknown>>(
    screenName: string,
    attributes?: T,
  ) {
    this.publish('screen', screenName, attributes);
  }

  static track<T extends Record<string, unknown>>(
    eventName: string,
    attributes?: T,
  ) {
    this.publish('track', eventName, attributes);
  }

  private static publish<
    E extends keyof AnalyticPlugin,
    P extends AnalyticPlugin[E],
    //TODO: proper typesscipt
    //@ts-ignore
  >(event: E, ...params: Parameters<P>) {
    if (ENV.APP_ENV !== 'production') {
      return;
    }

    this.plugins.forEach((plugin) =>
      //@ts-ignore
      tryNice(
        () =>
          plugin.isEnabled?.() &&
          typeof plugin[event] === 'function' &&
          //@ts-ignore
          plugin[event]?.(...params, this.user),
      ),
    );
  }
}
