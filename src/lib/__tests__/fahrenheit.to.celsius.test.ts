import { fahrenheitToCelsius } from '../celsius.to.fahrenheit';

describe('lib::fahrenheitToCelsius', () => {
  it('should convert 32 degrees Fahrenheit to 0 degrees Celsius', () => {
    const result = fahrenheitToCelsius(32);
    expect(result).toBe(0);
  });

  it('should convert 212 degrees Fahrenheit to 100 degrees Celsius', () => {
    const result = fahrenheitToCelsius(212);
    expect(result).toBe(100);
  });

  it('should convert -40 degrees Fahrenheit to -40 degrees Celsius', () => {
    const result = fahrenheitToCelsius(-40);
    expect(result).toBe(-40);
  });
});
