import { createStore, createStoreHook } from 'tiamut';

type _State = {
  airlineIata?: string;
  departureDate?: Date;
  flightNumber?: string;
  focusInput?: Exclude<keyof _State, 'focusInput'>;
  textSearch?: string;
};

const initialState: _State = {};

export const State = createStoreHook(
  createStore({
    actions: {
      reset(_) {
        return initialState;
      },
      setState(state, nextState: Partial<_State>) {
        return { ...state, ...nextState };
      },
    },
    initialState,
  }),
);
