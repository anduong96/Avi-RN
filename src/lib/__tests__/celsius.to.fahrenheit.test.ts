import { celsiusToFahrenheit } from '../celsius.to.fahrenheit';

describe('lib::celsiusToFahrenheit', () => {
  it('should convert 0 degrees Celsius to 32 degrees Fahrenheit', () => {
    const result = celsiusToFahrenheit(0);
    expect(result).toBe(32);
  });

  it('should convert 100 degrees Celsius to 212 degrees Fahrenheit', () => {
    const result = celsiusToFahrenheit(100);
    expect(result).toBe(212);
  });

  it('should convert -40 degrees Celsius to -40 degrees Fahrenheit', () => {
    const result = celsiusToFahrenheit(-40);
    expect(result).toBe(-40);
  });
});
