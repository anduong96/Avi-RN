export function replaceElement<T>(
  arr: readonly T[],
  newItem: T,
  condition: (item: T) => boolean,
): T[] {
  // Find the index of the first element that matches the condition
  const index = arr.findIndex(condition);

  if (index === -1) {
    // Return the original array if no matching element was found
    return arr as T[];
  }

  // Create a copy of the original array using the spread operator
  const newArr = [...arr];

  // Replace the element at the specified index with the new item
  newArr[index] = newItem;

  // Return the new array
  return newArr;
}
