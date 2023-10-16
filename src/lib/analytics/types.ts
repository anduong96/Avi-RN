import type { User } from '@app/types/user';

import { logger } from '../logger';

export abstract class AnalyticPlugin {
  protected logger = logger.extend(this.constructor.name);

  constructor(protected readonly user: User) {
    this.identify?.(user);
  }

  error?(
    error: Error,
    context?: Record<string, unknown>,
    user?: User,
  ): Promise<void> | void;

  protected identify?(user?: User): Promise<void> | void;

  isEnabled?(): boolean;

  registerPush?(): Promise<void> | void;

  screen?(
    screenName: string,
    attributes?: Record<string, unknown>,
    user?: User,
  ): Promise<void> | void;

  track?(
    eventName: string,
    attributes?: Record<string, unknown>,
    user?: User,
  ): Promise<void> | void;
}
