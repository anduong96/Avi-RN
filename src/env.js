const { tryNice } = require('try-nice');
const [_config] = tryNice(() => require('react-native-config').default);
const Config = _config ?? {};
const isDev = global.__DEV__ ?? false;

const ENV = {
  /**
   * @type {'production' | 'staging' | 'development'}
   */
  APP_ENV: Config.APP_ENV || 'development',
  CLARITY_PROJECT_ID: Config.CLARITY_PROJECT_ID,
  CODE_PUSH_DEPLOYMENT_KEY: Config.CODE_PUSH_DEPLOYMENT_KEY,
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
