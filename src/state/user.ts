import { createStore, createStoreHook } from 'tiamut';

import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

export const userState = createStoreHook(
  createStore({
    initialState: {} as FirebaseAuthTypes.User,
    actions: {
      setUser(_s, user: FirebaseAuthTypes.User) {
        return user;
      },
    },
  }),
);

firebase.auth().onAuthStateChanged((nextUser) => {
  if (nextUser) {
    userState.actions.setUser(nextUser);
  }
});

export function useUser() {
  return userState.useSelect((user) => user);
}
