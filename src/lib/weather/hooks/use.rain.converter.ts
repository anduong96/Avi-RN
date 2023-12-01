import Qty from 'js-quantities';

import { format } from '@app/lib/format';
import { INCHES, MILLIMETER } from '@app/constants';
import { useIsAmericanSystem } from '@app/lib/hooks/use.measurement.system';

export function useRainConverter() {
  const isAmericanSystem = useIsAmericanSystem();
  return (rainMM: number) => {
    const unit = isAmericanSystem ? INCHES : MILLIMETER;
    const value = Qty.swiftConverter(MILLIMETER, unit)(rainMM);
    const label = format('%s %s', rainMM, unit);
    return {
      label,
      unit,
      value,
    };
  };
}
