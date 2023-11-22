import * as React from 'react';

import * as RnHooks from '@react-native-community/hooks';

import { useGlobalState } from '@app/state/global';

/**
 * UseAppState() returns the current app state (active, background, inactive)
 * @returns A function that returns the current app state.
 */
export function useAppStateSync() {
  const _appState = RnHooks.useAppState();

  React.useEffect(() => {
    useGlobalState.setState({ _appState });
  }, [_appState]);
}

/**
 * The function `useAppState` returns the app state from the global state.
 * @returns the value of the `appState` property from the global state.
 */
export function useAppState() {
  return useGlobalState((s) => s._appState);
}

/**
 * The function "useAppActive" returns true if the app state is active, and false otherwise.
 * @returns a boolean value indicating whether the app state is 'active' or not.
 */
export function useAppActive() {
  return useAppState() === 'active';
}
