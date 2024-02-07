import { isNil } from 'lodash';
import { create } from 'zustand';

import type { MaybeNil } from '@app/types/maybe.nil';

type State = {
  airlineIata?: MaybeNil<string>;
  departureDate?: Date;
  destinationIata?: string;
  flightNumber?: string;
  focusInput?: Exclude<keyof State, 'focusInput'>;
  hasValue: <T extends keyof State>(key: Exclude<T, 'hasValue'>) => boolean;
  originIata?: MaybeNil<string>;
  reset: () => void;
  textSearch?: MaybeNil<string>;
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
      destinationIata: undefined,
      flightNumber: undefined,
      focusInput: undefined,
      originIata: undefined,
      textSearch: undefined,
    });
  },
  textSearch: undefined,
}));
