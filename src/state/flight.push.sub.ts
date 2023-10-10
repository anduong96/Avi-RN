import { tryNice } from 'try-nice';
import messaging from '@react-native-firebase/messaging';
import { createStore, createStoreHook, withShallow } from 'tiamut';

import { logger } from '@app/lib/logger';

import { withLocalStorage } from './plugins/preserve.local.plugin';

type State = {
  isReady: boolean;
  subscriptions: Record<
    string,
    {
      pushEnabled: boolean;
    }
  >;
};

export const FlightPushSubState = createStoreHook(
  createStore(
    withShallow({
      actions: {
        disablePush(state, flightID: string) {
          const next = state.subscriptions[flightID] || {};
          next.pushEnabled = false;
          state.subscriptions[flightID] = next;
          tryNice(() => messaging().unsubscribeFromTopic(flightID));
          logger.warn(`Remove subscription from flight: ${flightID}`);
          return state;
        },
        enablePush(state, flightID: string) {
          const next = state.subscriptions[flightID] || {};
          next.pushEnabled = true;
          state.subscriptions[flightID] = next;
          tryNice(() => messaging().subscribeToTopic(flightID));
          logger.warn(`Subscribed to flight: ${flightID}`);
          return state;
        },
        removeFlight(state, flightID: string) {
          delete state.subscriptions[flightID];
          tryNice(() => messaging().unsubscribeFromTopic(flightID));
          logger.warn(`Remove subscription from flight: ${flightID}`);
          return state;
        },
        setState(state, nextState: Partial<State>) {
          return {
            ...state,
            ...nextState,
          };
        },
      },

      initialState: {
        isReady: false,
        subscriptions: {},
      } as State,
    }),
  ),
);

withLocalStorage('FlightPushSubState', FlightPushSubState);
