import Qty from 'js-quantities';

import { usePreferenceQuery } from '@app/generated/server.gql';

export function useMeasurementDisplay(
  fromUnit: 'kg' | 'km',
  value?: null | number,
) {
  const preference = usePreferenceQuery();
  const preferredSystem = preference.data?.userPreference.measurement;

  if (!preferredSystem || !value) {
    return null;
  }

  const qty = Qty(value, fromUnit);

  if (preferredSystem === 'AMERICAN') {
    return qty
      .to(fromUnit === 'kg' ? 'lbs' : 'mi')
      .toPrec(1)
      .toString();
  }

  return qty.format();
}
