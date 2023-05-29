import React from 'react';
import { globalState } from '@app/state/global';
import { useColorScheme as useRnColorScheme } from 'react-native';

/**
 * UseColorScheme() is a React hook that sets the global state isDarkMode to true if the device is in
 * dark mode, and false if the device is in light mode.
 * @returns A function that returns a boolean value.
 */
export function useIsDarkMode() {
  return globalState.useSelect((s) => s.isDarkMode);
}

export function useColorScheme() {
  const scheme = useRnColorScheme();

  React.useMemo(() => {
    globalState.actions.setIsDarkMode(scheme === 'dark');
  }, [scheme]);
}
