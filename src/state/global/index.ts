import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging/lib';

import { AppState } from 'react-native';

import type { AppStateStatus } from 'react-native';

import { omitBy } from 'lodash';
import { create } from 'zustand';
import messaging from '@react-native-firebase/messaging';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Theme } from '@app/themes';

import { DARK_THEME } from '@app/themes';
import { ThemePreset } from '@app/themes/constants';

import { zustandMmkvStorage } from '../_plugins/zustand.mmkv.storage';

type State = {
  _appState: AppStateStatus;
  _hasFinishStartup: boolean;
  _hasPushAsked: boolean;
  _theme: Theme;
  hasOnboard: boolean;
  isFirstOpened: boolean;
  pushPermission: FirebaseMessagingTypes.AuthorizationStatus;
  theme: ThemePreset;
};

const GLOBAL_STATE_KEY = 'globalState_v3';
export const useGlobalState = create<State>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_set) => ({
      _appState: AppState.currentState,
      _hasFinishStartup: false,
      _hasPushAsked: false,
      _theme: DARK_THEME,
      hasOnboard: false,
      isFirstOpened: true,
      pushPermission: messaging.AuthorizationStatus.NOT_DETERMINED,
      theme: ThemePreset.DARK,
    }),
    {
      name: GLOBAL_STATE_KEY,
      partialize: (state) => omitBy(state, (_, key) => key.startsWith('_')),
      storage: createJSONStorage(() => zustandMmkvStorage),
    },
  ),
);
