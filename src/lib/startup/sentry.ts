import * as Sentry from '@sentry/react-native';

import { Alert, BackHandler } from 'react-native';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

import { ENV } from '@app/env';

Sentry.init({
  enabled: !__DEV__,
  debug: false,
  dsn: ENV.SENTRY_DSN,
  tracesSampleRate: 1.0,
  attachScreenshot: true,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation: new Sentry.ReactNavigationInstrumentation(),
      tracePropagationTargets: [/^\//],
    }),
  ],
});

setJSExceptionHandler((error, isFatal) => {
  Sentry.captureException(error);

  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${error.name} ${error.message}
        We have reported this to our team ! Please close the app and start again!
        `,
      [
        {
          text: 'Close',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
    );
  }
});

setNativeExceptionHandler((errorString) => {
  Sentry.captureException(errorString);
});
