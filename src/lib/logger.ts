import { logger as RnLogger, consoleTransport } from 'react-native-logs';

type LogLevel = 'debug' | 'error' | 'info' | 'warn';
export const logger = RnLogger.createLogger<LogLevel>({
  async: true,
  dateFormat: 'time',
  enabled: true,
  levels: {
    debug: 0,
    error: 3,
    info: 1,
    warn: 2,
  },
  printDate: true,
  printLevel: true,
  severity: 'debug',
  transport: [consoleTransport],
  transportOptions: {
    colors: {
      debug: 'grey',
      error: 'redBright',
      info: 'blueBright',
      warn: 'yellowBright',
    },
  },
});
