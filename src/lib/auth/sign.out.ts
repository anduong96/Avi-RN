import auth from '@react-native-firebase/auth';

import { NestServerApolloClient } from '@app/apollo/nest.server';

export async function signOut() {
  await auth().signOut();
  await NestServerApolloClient.cache.reset();
}
