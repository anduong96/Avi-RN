import { isNil } from 'lodash';

import type { Nil } from '@app/types/nil';

/**
 * Removes all non-numeric characters from the given input string.
 *
 * @param {string} input - The input string to remove non-numeric characters from.
 * @return {string} The input string with all non-numeric characters removed.
 */
export function removeNonNumericCharacters<T extends Nil | string>(
  input?: T,
): T extends Nil ? undefined : string {
  return isNil(input) ? undefined : (input.replace(/[^0-9]/g, '') as any);
}
