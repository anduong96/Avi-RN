import { isNil } from 'lodash';

import { State } from '.';

/**
 * The function `useHasValue` returns a boolean indicating whether a specific key in the state has a
 * value or not.
 * @param {K} key - The `key` parameter is a generic type `K` that extends the keys of the return type
 * of the `getState` method of the `State` object.
 * @returns a boolean value indicating whether the selected key in the state has a value or not.
 */
export function useHasValue<
  K extends keyof ReturnType<(typeof State)['getState']>,
>(key: K): boolean {
  return State.useSelect((state) => !isNil(state[key]) && state[key] !== '');
}
