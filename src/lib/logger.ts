import { logger as RnLogger } from 'react-native-logs';

export const logger = RnLogger.createLogger<
  'debug' | 'info' | 'warn' | 'error'
>({
  printLevel: true,
  printDate: true,
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
});

logger.patchConsole();
