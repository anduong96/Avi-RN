import { Alert, BackHandler, Platform } from 'react-native';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

import * as Sentry from '@sentry/react-native';

import { ENV } from '@app/env';

import { logger } from '../logger';
import { format } from '../format';

Sentry.init({
  attachScreenshot: true,
  attachViewHierarchy: true,
  debug: false,
  dsn: ENV.SENTRY_DSN,
  enableCaptureFailedRequests: true,
  enabled: !__DEV__,
  environment: format('%s-%s', ENV.APP_ENV, Platform.OS),
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation: new Sentry.ReactNavigationInstrumentation(),
      tracePropagationTargets: [/^\//],
    }),
  ],
  tracesSampleRate: 1.0,
});

setJSExceptionHandler((error, isFatal) => {
  logger.debug({ error, isFatal });
  Sentry.captureException(error);

  if (isFatal && !__DEV__) {
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${error.name} ${error.message}
        We have reported this to our team ! Please close the app and start again!
        `,
      [
        {
          onPress: () => {
            BackHandler.exitApp();
          },
          text: 'Close',
        },
      ],
    );
  }
}, true);

setNativeExceptionHandler((errorString) => {
  logger.debug({ errorString });
  Sentry.captureException(errorString);
});
