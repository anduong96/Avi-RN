export function celsiusToFahrenheit(celsius: number): number {
  const fahrenheit: number = Math.round((celsius * 9) / 5 + 32);
  return fahrenheit;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  const celsius: number = Math.round(((fahrenheit - 32) * 5) / 9);
  return celsius;
}
