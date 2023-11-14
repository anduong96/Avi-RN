import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { create } from 'zustand';

import { generateColors } from '@app/lib/generate.color';
import { getAvatarIcon } from '@app/lib/get.avatar.icon';

type State = {
  avatar: string;
  colors: ReturnType<typeof generateColors>;
  setUser: (user: FirebaseAuthTypes.User) => void;
  user: FirebaseAuthTypes.User;
};

const initialState = {} as State;

export const useUserState = create<State>((set) => ({
  ...initialState,
  setUser: (user) =>
    set({
      avatar: getAvatarIcon(user),
      colors: generateColors(user.uid),
      user,
    }),
}));
