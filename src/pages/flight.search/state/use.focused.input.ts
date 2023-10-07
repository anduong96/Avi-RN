import { State } from '.';

/**
 * The function returns the value of the focusInput state from the State object.
 * @returns the value of the `focusInput` property from the state.
 */
export function useFocusedInput() {
  return State.useSelect((state) => state.focusInput);
}
