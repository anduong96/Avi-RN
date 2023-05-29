/**
 * If the target is null or undefined, return true, otherwise return false.
 * @param {unknown} target - unknown
 * @returns true
 */
export function isNil(target: unknown): target is null | undefined {
  return target === null || target === undefined;
}
