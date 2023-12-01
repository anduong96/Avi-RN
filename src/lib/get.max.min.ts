import type { List } from 'lodash';

/**
 * The function `getMaxMin` takes a list and a function, and returns the maximum and minimum values
 * obtained by applying the function to each element in the list.
 * @param list - The `list` parameter is a generic type `List<T>`, which represents a list of elements
 * of type `T`.
 * @param fn - The `fn` parameter is a function that takes an element of the list as input and returns
 * a number. This function is used to extract a numerical value from each element of the list, which is
 * then used to determine the maximum and minimum values.
 * @returns The function `getMaxMin` returns an object with two properties: `max` and `min`. These
 * properties represent the maximum and minimum values obtained by applying the provided function `fn`
 * to each element in the `list`.
 */
export function getMaxMin<T>(list: List<T>, fn: (v: T) => number) {
  let max = -Infinity;
  let min = Infinity;

  for (const entry of Array.from(list)) {
    const value = fn(entry);
    if (value > max) {
      max = value;
    }
    if (value < min) {
      min = value;
    }
  }

  return {
    max,
    min,
  };
}
