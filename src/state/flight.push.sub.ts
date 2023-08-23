import { createStore, createStoreHook, withShallow } from 'tiamut';

import { logger } from '@app/lib/logger';
import messaging from '@react-native-firebase/messaging';
import { tryNice } from 'try-nice';
import { withLocalStorage } from './plugins/perserve.local.plugin';

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
      initialState: {
        isReady: false,
        subscriptions: {},
      } as State,

      actions: {
        setState(state, nextState: Partial<State>) {
          return {
            ...state,
            ...nextState,
          };
        },
        removeFlight(state, flightID: string) {
          delete state.subscriptions[flightID];
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
        disablePush(state, flightID: string) {
          const next = state.subscriptions[flightID] || {};
          next.pushEnabled = false;
          state.subscriptions[flightID] = next;
          tryNice(() => messaging().unsubscribeFromTopic(flightID));
          logger.warn(`Remove subscription from flight: ${flightID}`);
          return state;
        },
      },
    }),
  ),
);

withLocalStorage('FlightPushSubState', FlightPushSubState);
