import * as React from 'react';

import { AppState } from 'react-native';
import type { AppStateStatus } from 'react-native';

/**
 * UseAppState() returns the current app state (active, background, inactive)
 * @returns A function that returns the current app state.
 */
export function useAppState() {
  const [appState, setAppState] = React.useState<AppStateStatus>(
    AppState.currentState,
  );

  React.useEffect(() => {
    AppState.addEventListener('change', (state) => {
      setAppState(state);
    });
  }, []);

  return appState;
}

export function useAppActive() {
  return useAppState() === 'active';
}
