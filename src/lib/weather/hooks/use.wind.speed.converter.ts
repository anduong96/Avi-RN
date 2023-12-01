import Qty from 'js-quantities';

import { format } from '@app/lib/format';
import { useIsAmericanSystem } from '@app/lib/hooks/use.measurement.system';

export function useWindSpeedConverter() {
  const isAmericanSystem = useIsAmericanSystem();
  return (windSpeedMeterPerSecond: number) => {
    const unit = isAmericanSystem ? 'mi/h' : 'm/s';
    const value = Qty.swiftConverter('m/s', unit)(windSpeedMeterPerSecond);
    const label = format('%s %s', windSpeedMeterPerSecond, unit);
    return {
      label,
      unit,
      value,
    };
  };
}
