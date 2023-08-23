import { createStore, createStoreHook, withShallow } from 'tiamut';

import { AppState } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { withLocalStorage } from './plugins/perserve.local.plugin';

const initialState = {
  isReady: false,
  isAuth: false,
  isDarkMode: false,
  isFinishStartup: false,
  isPushAsked: false,
  hasOnboarded: false,
  appState: AppState.currentState,
  pushPermission: messaging.AuthorizationStatus.NOT_DETERMINED,
};

export const GlobalState = createStoreHook(
  createStore(
    withShallow({
      initialState,
      actions: {
        setState(state, nextState: Partial<typeof initialState>) {
          return {
            ...state,
            ...nextState,
          };
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
        setHasOnboarded(state, value: boolean) {
          state.hasOnboarded = value;
          return state;
        },
        authenticate(state) {
          state.isAuth = true;
          return state;
        },
      },
    }),
  ),
);

withLocalStorage('GlobalState', GlobalState);
