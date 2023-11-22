import * as React from 'react';

import { useGlobalState } from '@app/state/global';

import { logger } from '../logger';
import { useAppState } from './use.app.state';

/**
 * The `useFirstOpenSync` function is a custom hook that updates the global state to indicate whether
 * it is the first launch of the app when the app becomes inactive.
 */
export function useFirstOpenSync() {
  const appState = useAppState();
  const isFirstOpened = useGlobalState((s) => s.isFirstOpened);

  React.useEffect(() => {
    if (!isFirstOpened) {
      return;
    }

    if (appState === 'inactive') {
      logger.debug('App is inactive setting isFirstLaunch to false');
      useGlobalState.setState({ isFirstOpened: false });
    }
  }, [isFirstOpened, appState]);
}

/**
 * The function returns the value of the "isFirstOpened" property from the global state.
 * @returns The function `useIsFirstOpened` returns the value of `isFirstOpened` from the global state.
 */
export function useIsFirstOpened() {
  return useGlobalState((s) => s.isFirstOpened);
}
