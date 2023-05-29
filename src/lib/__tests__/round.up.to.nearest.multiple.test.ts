import { roundUpToNearestMultiple } from '../round.up.to.multiple';

describe('roundUpToNearestMultiple', () => {
  it('should return the same number when it is a multiple of 5', () => {
    expect(roundUpToNearestMultiple(0)).toBe(0);
    expect(roundUpToNearestMultiple(5)).toBe(5);
    expect(roundUpToNearestMultiple(10)).toBe(10);
    expect(roundUpToNearestMultiple(15)).toBe(15);
  });

  it('should round up to the nearest multiple of 5 when the number is not a multiple of 5', () => {
    expect(roundUpToNearestMultiple(1)).toBe(5);
    expect(roundUpToNearestMultiple(2)).toBe(5);
    expect(roundUpToNearestMultiple(3)).toBe(5);
    expect(roundUpToNearestMultiple(4)).toBe(5);
    expect(roundUpToNearestMultiple(6)).toBe(10);
    expect(roundUpToNearestMultiple(7)).toBe(10);
    expect(roundUpToNearestMultiple(8)).toBe(10);
    expect(roundUpToNearestMultiple(9)).toBe(10);
    expect(roundUpToNearestMultiple(11)).toBe(15);
    expect(roundUpToNearestMultiple(12)).toBe(15);
    expect(roundUpToNearestMultiple(13)).toBe(15);
    expect(roundUpToNearestMultiple(14)).toBe(15);
  });
});
