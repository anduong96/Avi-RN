import type { AppStateStatus } from 'react-native';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging/lib';

import { AppState } from 'react-native';

import { omitBy } from 'lodash';
import { create } from 'zustand';
import messaging from '@react-native-firebase/messaging';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ThemePreset } from '@app/themes/constants';

import { zustandMmkvStorage } from '../_plugins/zustand.mmkv.storage';

type State = {
  _appState: AppStateStatus;
  _hasFinishStartup: boolean;
  _hasPushAsked: boolean;
  hasOnboard: boolean;
  pushPermission: FirebaseMessagingTypes.AuthorizationStatus;
  theme: ThemePreset;
};

const GLOBAL_STATE_KEY = 'globalState';
export const useGlobalState = create<State>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_set) => ({
      _appState: AppState.currentState,
      _hasFinishStartup: false,
      _hasPushAsked: false,
      hasOnboard: false,
      pushPermission: messaging.AuthorizationStatus.NOT_DETERMINED,
      theme: ThemePreset.SYSTEM,
    }),
    {
      name: GLOBAL_STATE_KEY,
      partialize: (state) => omitBy(state, (_, key) => key.startsWith('_')),
      storage: createJSONStorage(() => zustandMmkvStorage),
    },
  ),
);
