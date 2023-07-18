import RNBootSplash from 'react-native-bootsplash';
import { logger } from './logger';

export async function bootApp() {
  logger.debug('Booting App');

  RNBootSplash.hide({
    fade: true,
    duration: 300,
  });
}
