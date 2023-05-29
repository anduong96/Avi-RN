import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

export async function signInWithApple() {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce, fullName } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  // Sign the user in with the credential
  await auth().signInWithCredential(appleCredential);

  if (fullName) {
    auth().currentUser?.updateProfile({
      displayName: [fullName.givenName, fullName.familyName].join(' '),
    });
  }
}
