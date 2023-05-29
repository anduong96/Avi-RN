/**
 * The function checks if a given string contains only numeric characters.
 * @param {string} value - a string that needs to be checked for non-numeric characters.
 * @returns The function `validateNumericOnly` returns a boolean value. It returns `true` if the input
 * `value` contains only numeric characters (0-9) and `false` if it contains any non-numeric
 * characters.
 */
export function validateNumericOnly(value: string) {
  const hasNonNumeric = /\D/.test(value);
  return !hasNonNumeric;
}
