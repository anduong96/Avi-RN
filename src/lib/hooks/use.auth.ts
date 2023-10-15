import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

import auth from '@react-native-firebase/auth';
import { createStore, createStoreHook } from 'tiamut';

type User = FirebaseAuthTypes.User | null;

const store = createStoreHook(
  createStore({
    actions: {
      setUser(_, user: User) {
        return user;
      },
    },
    initialState: null as User,
  }),
);

auth().onAuthStateChanged(async (firebaseUser) => {
  store.actions.setUser(firebaseUser);
});

export const useFirebaseUser = () => {
  return store.useSelect((s) => s);
};

export const useIsAnonymousUser = () => {
  return store.useSelect((s) => s?.isAnonymous);
};
