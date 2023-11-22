import { create } from 'zustand';
import { omit, omitBy } from 'lodash';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Flight } from '@app/generated/server.gql';

import { zustandMmkvStorage } from '../_plugins/zustand.mmkv.storage';

type PushState = { pushEnabled: boolean };
type State = {
  getFlightPush: (flightID: Flight['id']) => PushState;
  removeFlightPush: (flightID: Flight['id']) => void;
  setFlightPush: (flightID: Flight['id'], value: PushState) => void;
  subscriptions: Record<string, PushState>;
};

const FLIGHT_NOTIFICATIONS_STATE_KEY = 'flightNotificationsState';
export const useFlightNotificationsState = create<State>()(
  persist(
    (set, get) => ({
      getFlightPush(flightID) {
        return get()['subscriptions'][flightID] ?? { pushEnabled: false };
      },
      removeFlightPush(flightID) {
        set({ subscriptions: omit(get()['subscriptions'], flightID) });
      },
      setFlightPush(flightID, value) {
        set({
          subscriptions: {
            ...get()['subscriptions'],
            [flightID]: value,
          },
        });
      },
      subscriptions: {},
    }),
    {
      name: FLIGHT_NOTIFICATIONS_STATE_KEY,
      partialize: (state) => omitBy(state, (_, key) => key.startsWith('_')),
      storage: createJSONStorage(() => zustandMmkvStorage),
    },
  ),
);
