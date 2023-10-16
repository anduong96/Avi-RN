import auth from '@react-native-firebase/auth';

import { AppServerApolloClient } from '@app/apollo/app.server';

export async function signOut() {
  await auth().signOut();
  await AppServerApolloClient.cache.reset();
  await auth().signInAnonymously();
}
