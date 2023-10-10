import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

import auth from '@react-native-firebase/auth';
import { createStore, createStoreHook } from 'tiamut';

const store = createStoreHook(
  createStore({
    actions: {
      setUser(_, user: FirebaseAuthTypes.User | null) {
        return user;
      },
    },
    initialState: null as FirebaseAuthTypes.User | null,
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
