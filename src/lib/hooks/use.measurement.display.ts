import { isNil } from 'lodash';
import Qty from 'js-quantities';

import { DEGREE } from '@app/constants';
import { MeasurementType, usePreferenceQuery } from '@app/generated/server.gql';

import { format } from '../format';
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from '../celsius.to.fahrenheit';

const formatter: Qty.Formatter = (scalar, unit) => {
  return format('%s %s', scalar.toLocaleString(), unit);
};

export function useMeasurementDisplay(
  fromUnit: 'kg' | 'km',
  value?: null | number,
) {
  const preference = usePreferenceQuery();
  const preferredSystem = preference.data?.userPreference.measurement;

  if (!preferredSystem || isNil(value)) {
    return null;
  }

  const qty = Qty(value, fromUnit);

  if (preferredSystem === MeasurementType.AMERICAN) {
    return qty
      .to(fromUnit === 'kg' ? 'lbs' : 'mi')
      .toPrec(1)
      .format(formatter);
  }

  return qty.toPrec(1).format(formatter);
}

export function useGetTemperatureDisplay(fromUnit: 'celsius' | 'fahrenheit') {
  const preference = usePreferenceQuery();
  const preferredSystem = preference.data?.userPreference.measurement;
  const isCelsius = fromUnit === 'celsius';

  return (value?: number) => {
    const hasValue = preferredSystem && !isNil(value);
    return hasValue
      ? format(
          '%s %s%s',
          isCelsius
            ? preferredSystem === MeasurementType.AMERICAN
              ? celsiusToFahrenheit(value) // is celsius and American
              : value // is celsius and Metric
            : preferredSystem === MeasurementType.AMERICAN
              ? value // is fahrenheit and American
              : fahrenheitToCelsius(value), // is fahrenheit and Metric
          DEGREE,
          isCelsius ? 'C' : 'F',
        )
      : null;
  };
}
