import { isNil } from 'lodash';
import { create } from 'zustand';

type State = {
  airlineIata?: string;
  departureDate?: Date;
  flightNumber?: string;
  focusInput?: Exclude<keyof State, 'focusInput'>;
  hasValue: <T extends keyof State>(key: Exclude<T, 'hasValue'>) => boolean;
  reset: () => void;
  textSearch?: string;
};

export const useFlightSearchState = create<State>((set, get) => ({
  airlineIata: undefined,
  departureDate: undefined,
  flightNumber: undefined,
  focusInput: undefined,
  hasValue: (key) => {
    const value = get()[key];
    return !isNil(value) && value !== '';
  },
  reset: () => {
    set({
      airlineIata: undefined,
      departureDate: undefined,
      flightNumber: undefined,
      focusInput: undefined,
      textSearch: undefined,
    });
  },
  textSearch: undefined,
}));
