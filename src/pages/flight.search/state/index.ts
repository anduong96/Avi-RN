import { createStore, createStoreHook } from 'tiamut';

type _State = {
  flightNumber?: string;
  airlineIata?: string;
  departureDate?: Date;
  textSearch?: string;
  focusInput?: Exclude<keyof _State, 'focusInput'>;
};

const initialState: _State = {};

export const State = createStoreHook(
  createStore({
    initialState,
    actions: {
      reset(_) {
        return initialState;
      },
      setState(state, nextState: Partial<_State>) {
        return { ...state, ...nextState };
      },
    },
  }),
);
