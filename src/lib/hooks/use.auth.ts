import { createStore, createStoreHook } from 'tiamut';

import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

const store = createStoreHook(
  createStore({
    initialState: null as null | FirebaseAuthTypes.User,
    actions: {
      setUser(_, user: null | FirebaseAuthTypes.User) {
        return user;
      },
    },
  }),
);

auth().onUserChanged(async (firebaseUser) => {
  store.actions.setUser(firebaseUser);
});

export const useFirebaseUser = () => {
  return store.useSelect((s) => s);
};

export const useIsAnonymousUser = () => {
  return store.useSelect((s) => s?.isAnonymous);
};
