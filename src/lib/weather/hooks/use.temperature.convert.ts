import { format } from '@app/lib/format';
import { CELSIUS, DEGREE, FAHRENHEIT } from '@app/constants';
import { celsiusToFahrenheit } from '@app/lib/celsius.to.fahrenheit';
import { useIsAmericanSystem } from '@app/lib/hooks/use.measurement.system';

export function useTemperatureConverter() {
  const isAmericanSystem = useIsAmericanSystem();
  return (temperatureCelsius: number = 0) => {
    const unit = DEGREE + (isAmericanSystem ? FAHRENHEIT : CELSIUS);
    const value = isAmericanSystem
      ? celsiusToFahrenheit(temperatureCelsius)
      : temperatureCelsius;
    const label = format('%s %s', temperatureCelsius, unit);

    return {
      label,
      unit,
      value,
    };
  };
}
