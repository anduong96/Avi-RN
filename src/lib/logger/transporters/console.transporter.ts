/* eslint-disable no-console */

import DeviceInfo from 'react-native-device-info';

import { compact } from 'lodash';

import { format } from '@app/lib/format';

import type { LogTransporter } from '../types';

import { LogLevel } from '../constants';

const deviceName = DeviceInfo.getSystemName();
const platformName = DeviceInfo.getBaseOsSync();

function getLogFn(logLevel: LogLevel) {
  switch (logLevel) {
    case LogLevel.DEBUG:
      return console.debug;
    case LogLevel.INFO:
      return console.info;
    case LogLevel.WARN:
      return console.warn;
    case LogLevel.ERROR:
      return console.error;
    case LogLevel.FATAL:
      return console.error;
    case LogLevel.TRACE:
      return console.trace;
    default:
      return console.debug;
  }
}

export const consoleTransporter: LogTransporter = ({
  logLevel,
  message,
  minLevel,
  name,
  timestamp,
}) => {
  if (minLevel < logLevel) {
    return;
  }

  const timestampStr = timestamp.toISOString();
  const nameParts = compact([deviceName || platformName, name]).join(' | ');
  const nameStr = format('[%s]', nameParts);
  const logFn = getLogFn(logLevel);

  logFn(format('%s %s\n %s\n⠀', timestampStr, nameStr, message));
};
