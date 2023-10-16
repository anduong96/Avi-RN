import { firebase } from '@react-native-firebase/auth';

import { Analytics } from './core';

firebase.auth().onAuthStateChanged((nextUser) => {
  if (nextUser) {
    Analytics.identify(nextUser);
  }
});
