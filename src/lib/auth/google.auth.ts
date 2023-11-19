import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { ENV } from '@app/env';

import { logger } from '../logger';
import { format } from '../format';

GoogleSignin.configure({
  offlineAccess: false,
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/user.gender.read',
    'https://www.googleapis.com/auth/user.birthday.read',
    'https://www.googleapis.com/auth/user.phonenumbers.read',
  ],
  webClientId: ENV.GOOGLE_WEB_CLIENT_ID,
});

export async function signInWithGoogle() {
  logger.debug(
    format(
      'Signing in with Google, WEB_CLIENT_ID=%s',
      ENV.GOOGLE_WEB_CLIENT_ID,
    ),
  );

  // Check if your device supports Google Play
  const arePlayServicesAvailable = await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });

  logger.debug(
    format('Google Play Services are available=%s', arePlayServicesAvailable),
  );

  // Get the users ID token
  const userInfo = await GoogleSignin.signIn();
  logger.debug(format('Google user=%o', userInfo));
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
