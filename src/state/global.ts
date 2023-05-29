import { createStore, createStoreHook, withShallow } from 'tiamut';

import { storage } from '@app/lib/storage';

const initialState = {
  isInit: false,
  isAuth: false,
  isDarkMode: false,
  isFinishStartup: false,
  isPushAsked: undefined as undefined | boolean,
  hasOnboarded: false,
};

export const globalState = createStoreHook(
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

const key = 'globalState';

globalState.subscribe((value) => {
  if (value.isInit) {
    storage.setItem(key, JSON.stringify(value));
  }
});

export async function restoreGlobalState() {
  await storage
    .getItem(key)
    .then((value) => {
      globalState.actions.setState(value ? JSON.parse(value as string) : {});
    })
    .finally(() =>
      globalState.actions.setState({
        isInit: true,
      }),
    );
}
