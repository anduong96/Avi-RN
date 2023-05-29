import type { User } from '@app/generated/server.gql';
import { logger } from '../logger';

export abstract class AnalyticPlugin {
  protected logger = logger.extend(this.constructor.name);

  constructor(protected readonly user: User) {
    this.identify?.(user);
  }

  isEnabled?(): boolean;

  track?(
    eventName: string,
    attributes?: Record<string, unknown>,
    user?: User,
  ): void | Promise<void>;

  screen?(
    screenName: string,
    attributes?: Record<string, unknown>,
    user?: User,
  ): void | Promise<void>;

  protected identify?(user?: User): void | Promise<void>;

  registerPush?(): void | Promise<void>;

  error?(
    error: Error,
    context?: Record<string, unknown>,
    user?: User,
  ): void | Promise<void>;
}
