import * as React from 'react';

import { AppState } from 'react-native';
import { GlobalState } from '@app/state/global';

/**
 * UseAppState() returns the current app state (active, background, inactive)
 * @returns A function that returns the current app state.
 */
export function useAppStateListener() {
  React.useEffect(() => {
    AppState.addEventListener('change', (state) => {
      GlobalState.actions.setState({ appState: state });
    });
  }, []);
}

/**
 * The function `useAppState` returns the app state from the global state.
 * @returns the value of the `appState` property from the global state.
 */
export function useAppState() {
  return GlobalState.useSelect((s) => s.appState);
}

/**
 * The function "useAppActive" returns true if the app state is active, and false otherwise.
 * @returns a boolean value indicating whether the app state is 'active' or not.
 */
export function useAppActive() {
  return useAppState() === 'active';
}
