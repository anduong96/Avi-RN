import { firebase } from '@react-native-firebase/auth';

export async function getAuthToken() {
  const token = await firebase.auth().currentUser?.getIdToken();
  return token;
}
