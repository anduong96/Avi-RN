import type { FLIGHT_SEARCH_STATE_STEP } from '../state';
import { flightSearchState } from '../state';

export function useIsFocused(step: FLIGHT_SEARCH_STATE_STEP) {
  return flightSearchState.useSelect((s) => s.step === step);
}
