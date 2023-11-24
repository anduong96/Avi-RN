import { isNil } from 'lodash';
import Qty from 'js-quantities';

import { MeasurementType, usePreferenceQuery } from '@app/generated/server.gql';

import { format } from '../format';

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
