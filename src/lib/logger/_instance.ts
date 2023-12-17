import { Platform } from 'react-native';

import { compact, slice } from 'lodash';

import type { LogTransporter } from './types';

import { format } from '../format';
import { LogLevel } from './constants';
import { consoleTransporter } from './transporters/console.transporter';

export class Logger {
  static LEVEL = LogLevel;
  private minLevel = LogLevel.DEBUG;
  private name?: string;
  private transporter: LogTransporter[] = __DEV__ ? [consoleTransporter] : [];

  constructor(options?: {
    minLevel?: LogLevel;
    name: string[];
    transporters?: LogTransporter[];
  }) {
    this.transporter = options?.transporters ?? this.transporter;
    this.minLevel = options?.minLevel ?? this.minLevel;
    this.name = options?.name ? options?.name.join(' -> ') : undefined;
  }

  private formatMessage(args: unknown[]) {
    if (typeof args[0] === 'string' && args[0].includes('%')) {
      return format(args[0], ...slice(args, 1));
    }

    const template = args
      .map((arg, index) =>
        typeof arg === 'string'
          ? '%s'
          : typeof args === 'number'
            ? '%d'
            : index > 0
              ? '\n%j'
              : '%j',
      )
      .join(' ');

    return format(template, ...args);
  }

  private log(level: LogLevel, ...args: unknown[]) {
    const timestamp = new Date();
    const platform = Platform.OS;
    const message = this.formatMessage(args);

    for (const transporter of this.transporter) {
      transporter({
        logLevel: level,
        message: message,
        minLevel: this.minLevel,
        name: this.name,
        platform,
        rawArgs: args,
        timestamp: timestamp,
      });
    }
  }

  debug(...args: unknown[]) {
    this.log(LogLevel.DEBUG, ...args);
  }

  error(...args: unknown[]) {
    this.log(LogLevel.ERROR, ...args);
  }

  fatal(...args: unknown[]) {
    this.log(LogLevel.FATAL, ...args);
  }

  getSubLogger(name: string | string[]) {
    const subLoggerName = [this.name, ...(Array.isArray(name) ? name : [name])];

    return new Logger({
      minLevel: this.minLevel,
      name: compact(subLoggerName),
      transporters: this.transporter,
    });
  }

  info(...args: unknown[]) {
    this.log(LogLevel.INFO, ...args);
  }

  trace(...args: unknown[]) {
    this.log(LogLevel.TRACE, ...args);
  }

  warn(...args: unknown[]) {
    this.log(LogLevel.WARN, ...args);
  }
}
