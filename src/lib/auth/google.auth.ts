import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { ENV } from '@app/env';

GoogleSignin.configure({
  offlineAccess: false,
  scopes: [
    // 'https://www.googleapis.com/auth/userinfo.profile',
    // 'https://www.googleapis.com/auth/userinfo.email',
    // 'https://www.googleapis.com/auth/user.gender.read',
    // 'https://www.googleapis.com/auth/user.birthday.read',
    // 'https://www.googleapis.com/auth/user.phonenumbers.read',
  ],
  webClientId: ENV.GOOGLE_WEB_CLIENT_ID,
});

export async function signInWithGoogle() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
