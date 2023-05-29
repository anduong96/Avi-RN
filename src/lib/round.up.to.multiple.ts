/**
 * The function rounds up a given number to the nearest multiple of a specified number.
 * @param {number} num - The number that needs to be rounded up to the nearest multiple of the
 * specified multiple.
 * @param {number} [multiple=5] - The "multiple" parameter is an optional parameter that specifies the
 * number to which the "num" parameter should be rounded up to. If "multiple" is not provided, it
 * defaults to 5.
 * @returns The function `roundUpToNearestMultiple` returns a number that is rounded up to the nearest
 * multiple of the `multiple` parameter. If the `num` parameter is already a multiple of `multiple`, it
 * is returned as is.
 */
export function roundUpToNearestMultiple(
  num: number,
  multiple: number = 5,
): number {
  const remainder = num % multiple;
  return remainder === 0 ? num : num + multiple - remainder;
}
