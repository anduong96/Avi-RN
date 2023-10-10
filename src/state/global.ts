import { AppState } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { createStore, createStoreHook, withShallow } from 'tiamut';

import { withLocalStorage } from './plugins/preserve.local.plugin';

const initialState = {
  appState: AppState.currentState,
  hasOnboard: false,
  isAuth: false,
  isDarkMode: false,
  isFinishStartup: false,
  isPushAsked: false,
  isReady: false,
  pushPermission: messaging.AuthorizationStatus.NOT_DETERMINED,
};

export const GlobalState = createStoreHook(
  createStore(
    withShallow({
      actions: {
        authenticate(state) {
          state.isAuth = true;
          return state;
        },
        setHasOnboard(state, value: boolean) {
          state.hasOnboard = value;
          return state;
        },
        setIsDarkMode(state, value: boolean) {
          state.isDarkMode = value;
          return state;
        },
        setIsPushAsked(state) {
          state.isPushAsked = true;
          return state;
        },
        setIsStartUpFinish(state) {
          state.isFinishStartup = true;
          return state;
        },
        setState(state, nextState: Partial<typeof initialState>) {
          return {
            ...state,
            ...nextState,
          };
        },
      },
      initialState,
    }),
  ),
);

withLocalStorage('GlobalState', GlobalState);
