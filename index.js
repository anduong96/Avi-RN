/**
 * @format
 */

import './src/lib/startup/sentry';

import { AppRegistry, LogBox } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['Importing FullWindowOverlay is only valid on iOS devices']);

AppRegistry.registerComponent(appName, () => App);
