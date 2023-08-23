import { findArrayDifferences } from './find.difference'; // Replace with the actual path to your file

describe('findArrayDifferences', () => {
  it('should find added and removed elements between arrays', () => {
    const array1 = ['apple', 'banana', 'cherry', 'date'];
    const array2 = ['banana', 'cherry', 'fig', 'grape'];

    const differences = findArrayDifferences(array1, array2);

    expect(differences.added).toEqual(['fig', 'grape']);
    expect(differences.removed).toEqual(['apple', 'date']);
  });

  it('should handle arrays with no differences', () => {
    const array1 = ['apple', 'banana', 'cherry'];
    const array2 = ['apple', 'banana', 'cherry'];

    const differences = findArrayDifferences(array1, array2);

    expect(differences.added).toEqual([]);
    expect(differences.removed).toEqual([]);
  });

  it('should handle empty arrays', () => {
    const array1: string[] = [];
    const array2: string[] = [];

    const differences = findArrayDifferences(array1, array2);

    expect(differences.added).toEqual([]);
    expect(differences.removed).toEqual([]);
  });

  it('should handle arrays with common elements', () => {
    const array1 = ['apple', 'banana', 'cherry'];
    const array2 = ['banana', 'cherry', 'date'];

    const differences = findArrayDifferences(array1, array2);

    expect(differences.added).toEqual(['date']);
    expect(differences.removed).toEqual(['apple']);
  });
});
