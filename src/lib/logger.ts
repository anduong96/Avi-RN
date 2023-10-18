import { logger as RnLogger, consoleTransport } from 'react-native-logs';

type LogLevel = 'debug' | 'error' | 'info' | 'warn';
export const logger = RnLogger.createLogger<LogLevel>({
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
});
