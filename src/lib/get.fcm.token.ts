import { firebase } from '@react-native-firebase/messaging';

export function getFcmToken() {
  return firebase.messaging().getToken();
}
