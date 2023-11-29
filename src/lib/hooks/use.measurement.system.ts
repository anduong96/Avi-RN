import { useGlobalState } from '@app/state/global';
import { MeasurementType } from '@app/generated/server.gql';

/**
 * The function returns the measurement system used in the global state.
 * @returns the value of the `_measurementType` property from the global state.
 */
export function useMeasurementSystem() {
  return useGlobalState((s) => s._measurementType);
}

export function useIsAmericanSystem() {
  return useGlobalState((s) => s._measurementType === MeasurementType.AMERICAN);
}
