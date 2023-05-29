import { replaceElement } from '../replace.element';

describe('replaceElement', () => {
  it('should return the original array if no matching element was found', () => {
    const arr = [1, 2, 3, 4, 5];
    const newArr = replaceElement(arr, 99, (item) => item === 99);
    expect(newArr).toEqual(arr);
  });

  it('should replace the first element that matches the condition', () => {
    const arr = [1, 2, 3, 4, 5];
    const newArr = replaceElement(arr, 99, (item) => item === 3);
    expect(newArr).toEqual([1, 2, 99, 4, 5]);
  });

  it('should return a new array with the replaced element', () => {
    const arr = [1, 2, 3, 4, 5];
    const newArr = replaceElement(arr, 99, (item) => item === 3);
    expect(newArr).not.toBe(arr);
  });

  it('should preserve the original array order', () => {
    const arr = [1, 2, 3, 4, 5];
    const newArr = replaceElement(arr, 99, (item) => item === 3);
    expect(newArr).toEqual([1, 2, 99, 4, 5]);
  });

  it('should replace the first element even if there are multiple matches', () => {
    const arr = [1, 2, 3, 3, 5];
    const newArr = replaceElement(arr, 99, (item) => item === 3);
    expect(newArr).toEqual([1, 2, 99, 3, 5]);
  });
});
