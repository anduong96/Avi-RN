/**
 * Asserts that a condition is true, and throws an error with the specified
 * message if it is not.
 *
 * @param {boolean} condition - The condition to assert.
 * @param {string} message - The error message to throw if the condition is
 *                           false.
 * @returns {void}
 */
export function assert(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
