import { logger as RnLogger } from 'react-native-logs';

export const logger = RnLogger.createLogger<
  'debug' | 'error' | 'info' | 'warn'
>({
  levels: {
    debug: 0,
    error: 3,
    info: 1,
    warn: 2,
  },
  printDate: true,
  printLevel: true,
});

// logger.patchConsole();
