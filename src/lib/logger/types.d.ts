import type { LogLevel } from './constants';

export type LogTransporterProps = {
  logLevel: LogLevel;
  message?: string;
  minLevel: LogLevel;
  name?: string;
  platform: string;
  rawArgs: unknown[];
  timestamp: Date;
};

export type LogTransporter = (props: LogTransporterProps) => void;
