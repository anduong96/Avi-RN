const { tryNice } = require('try-nice');
const [_config] = tryNice(() => require('react-native-config').default);
const Config = _config ?? {};
const isDev = global.__DEV__ ?? false;

const ENV = {
  /**
   * @type {'production' | 'staging' | 'development'}
   */
  APP_ENV: Config.APP_ENV,
  SERVER:
    Config.SERVER ||
    (isDev
      ? `http://${require('react-native-localhost').default}:3000`
      : Config.SERVER),
  GOOGLE_WEB_CLIENT_ID: Config.GOOGLE_WEB_CLIENT_ID,
  SENTRY_DSN: Config.SENTRY_DSN,
  CODE_PUSH_DEPLOYMENT_KEY: Config.CODE_PUSH_DEPLOYMENT_KEY,
  RUDDER_STACK_KEY: Config.RUDDER_STACK_KEY,
  RUDDER_STACK_DATAPLANE_URL: Config.RUDDER_STACK_DATAPLANE_URL,
  SMARTLOOK_KEY: Config.SMARTLOOK_KEY,
  CLARITY_PROJECT_ID: Config.CLARITY_PROJECT_ID,
};

module.exports = {
  ENV,
};
