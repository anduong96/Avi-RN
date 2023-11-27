export function celsiusToFahrenheit(celsius: number): number {
  const fahrenheit: number = (celsius * 9) / 5 + 32;
  return fahrenheit;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  const celsius: number = ((fahrenheit - 32) * 5) / 9;
  return celsius;
}
