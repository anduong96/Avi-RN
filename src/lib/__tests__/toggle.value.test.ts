import { toggleValue } from '../toggle.value';

describe('toggleValue function', () => {
  it('should return the nextValue if current is not equal to nextValue', () => {
    const current = 1;
    const nextValue = 2;
    const result = toggleValue(current, nextValue);
    expect(result).toEqual(nextValue);
  });

  it('should return the offValue if current is equal to nextValue', () => {
    const current = 'hello';
    const nextValue = 'hello';
    const offValue = 'goodbye';
    const result = toggleValue(current, nextValue, offValue);
    expect(result).toEqual(offValue);
  });

  it('should return the offValue if it is provided and current is not equal to nextValue', () => {
    const current = false;
    const nextValue = true;
    const offValue = 'off';
    const result = toggleValue(current, nextValue, offValue);
    expect(result).toEqual(nextValue);
  });
});
