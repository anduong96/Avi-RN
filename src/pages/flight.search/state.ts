import { createStore, createStoreHook } from 'tiamut';

export enum FLIGHT_SEARCH_STATE_STEP {
  AIRLINE,
  FLIGHT_NUMBER,
  DEPARTURE_DATE,
}

type InitialState = {
  step: FLIGHT_SEARCH_STATE_STEP;
  airlineIata?: string;
  flightNumber?: string;
  departureDate?: Date;
};

const initialState: InitialState = {
  step: FLIGHT_SEARCH_STATE_STEP.AIRLINE,
};

export const flightSearchState = createStoreHook(
  createStore({
    initialState,
    actions: {
      setStep(state, nextStep: FLIGHT_SEARCH_STATE_STEP) {
        return {
          ...state,
          step: nextStep,
        };
      },
      setState(state, nextState?: Partial<InitialState>) {
        return {
          ...state,
          ...nextState,
        };
      },
      resetState(_state) {
        return initialState;
      },
    },
  }),
);
