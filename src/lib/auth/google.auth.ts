import { ENV } from '@app/env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NestServerApolloClient } from '@app/apollo/nest.server';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: ENV.GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
  scopes: [
    // 'https://www.googleapis.com/auth/userinfo.profile',
    // 'https://www.googleapis.com/auth/userinfo.email',
    // 'https://www.googleapis.com/auth/user.gender.read',
    // 'https://www.googleapis.com/auth/user.birthday.read',
    // 'https://www.googleapis.com/auth/user.phonenumbers.read',
  ],
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

export async function signOut() {
  await auth().signOut();
  await NestServerApolloClient.cache.reset();
}
