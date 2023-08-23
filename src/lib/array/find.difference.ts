/**
 * The `findArrayDifferences` function takes two arrays as input and returns an object containing the
 * elements that were added to the second array compared to the first array, as well as the elements
 * that were removed from the first array compared to the second array.
 * @param arr1 - The `arr1` parameter is an array of type `T`. It represents the first array that you
 * want to compare with another array.
 * @param arr2 - The `arr2` parameter is an array of elements that you want to compare with `arr1` to
 * find the differences.
 * @returns The function `findArrayDifferences` returns an object with two properties: `added` and
 * `removed`. The `added` property is an array of elements that are present in `arr2` but not in
 * `arr1`. The `removed` property is an array of elements that are present in `arr1` but not in `arr2`.
 */
export function findArrayDifferences<T>(
  arr1: Array<T>,
  arr2: Array<T>,
): { added: T[]; removed: T[] } {
  const added: T[] = [];
  const removed: T[] = [];

  // Find added elements in arr2 compared to arr1
  for (const item of arr2) {
    if (!arr1.includes(item)) {
      added.push(item);
    }
  }

  // Find removed elements in arr1 compared to arr2
  for (const item of arr1) {
    if (!arr2.includes(item)) {
      removed.push(item);
    }
  }

  return {
    added,
    removed,
  };
}
