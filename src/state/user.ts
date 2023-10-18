import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { createStore, createStoreHook } from 'tiamut';
import { firebase } from '@react-native-firebase/auth';

import { generateColors } from '@app/lib/generate.color';
import { getAvatarIcon } from '@app/lib/get.avatar.icon';
import { SyncUserDocument } from '@app/generated/server.gql';
import { AppServerApolloClient } from '@app/apollo/app.server';

type State = {
  avatar: string;
  colors: ReturnType<typeof generateColors>;
  user: FirebaseAuthTypes.User;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: State = {} as any;

export const userState = createStoreHook(
  createStore({
    actions: {
      setUser(state, user: FirebaseAuthTypes.User) {
        return {
          ...state,
          avatar: getAvatarIcon(user),
          colors: generateColors(user.uid),
          user,
        };
      },
    },
    initialState,
  }),
);

firebase.auth().onAuthStateChanged((nextUser) => {
  if (nextUser) {
    userState.actions.setUser(nextUser);
  }

  if (!nextUser?.isAnonymous) {
    AppServerApolloClient.mutate({
      mutation: SyncUserDocument,
    });
  }
});

export function useUser() {
  return userState.useSelect((state) => state.user);
}
