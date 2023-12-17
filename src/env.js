const { tryNice } = require('try-nice');
const [_config] = tryNice(() => require('react-native-config').default);
const Config = _config ?? {};

/**
 * @type {'production' | 'staging' | 'development'}
 */
const APP_ENV = Config.APP_ENV || 'development';
const isDev = global.__DEV__ ?? APP_ENV === 'development';

const ENV = {
  APP_ENV,
  IS_DEV: isDev,
  IS_PROD: APP_ENV === 'production',
  CLARITY_PROJECT_ID: Config.CLARITY_PROJECT_ID,
  CODE_PUSH_DEPLOYMENT_KEY_IOS: Config.CODE_PUSH_DEPLOYMENT_KEY_IOS,
  CODE_PUSH_DEPLOYMENT_KEY_AND: Config.CODE_PUSH_DEPLOYMENT_KEY_AND,
  GOOGLE_WEB_CLIENT_ID: Config.GOOGLE_WEB_CLIENT_ID,
  RUDDER_STACK_DATAPLANE_URL: Config.RUDDER_STACK_DATAPLANE_URL,
  RUDDER_STACK_KEY: Config.RUDDER_STACK_KEY,
  SENTRY_DSN: Config.SENTRY_DSN,
  SERVER:
    Config.SERVER ||
    (isDev
      ? `http://${require('react-native-localhost').default}:3000`
      : Config.SERVER),
  SMARTLOOK_KEY: Config.SMARTLOOK_KEY,
};

module.exports = {
  ENV,
};
