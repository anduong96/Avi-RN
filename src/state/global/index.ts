import type { AppStateStatus } from 'react-native';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging/lib';

import { AppState } from 'react-native';

import { omitBy } from 'lodash';
import { create } from 'zustand';
import messaging from '@react-native-firebase/messaging';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandMmkvStorage } from '../_plugins/zustand.mmkv.storage';

type State = {
  _appState: AppStateStatus;
  _hasFinishStartup: boolean;
  _hasHydrated: boolean;
  _hasPushAsked: boolean;
  _setHasHydrated: (value: boolean) => void;
  hasOnboard: boolean;
  isDarkMode: boolean;
  pushPermission: FirebaseMessagingTypes.AuthorizationStatus;
};

const GLOBAL_STATE_KEY = 'globalState';
export const useGlobalState = create<State>()(
  persist(
    (set) => ({
      _appState: AppState.currentState,
      _hasFinishStartup: false,
      _hasHydrated: false,
      _hasPushAsked: false,
      _setHasHydrated: (value: boolean) => {
        set({
          _hasHydrated: value,
        });
      },
      hasOnboard: false,
      isDarkMode: false,
      pushPermission: messaging.AuthorizationStatus.NOT_DETERMINED,
    }),
    {
      name: GLOBAL_STATE_KEY,
      onRehydrateStorage: () => (state) => state?._setHasHydrated(true),
      partialize: (state) => omitBy(state, (_, key) => key.startsWith('_')),
      storage: createJSONStorage(() => zustandMmkvStorage),
    },
  ),
);
