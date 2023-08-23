import type { ActionsMap, Store } from 'tiamut/dist/types';

import { storage } from '@app/lib/storage';
import { tryNice } from 'try-nice';

export function withLocalStorage<
  State extends {
    isReady?: boolean;
  },
  A extends ActionsMap<State> & {
    setState: (state: State, nextState: Partial<State>) => void;
  },
>(key: string, store: Pick<Store<State, A>, 'subscribe' | 'actions'>) {
  store.subscribe((value) => {
    if (value.isReady) {
      storage.setItem(key, JSON.stringify(value));
    }
  });

  storage
    .getItem(key)
    .then((value) => {
      const [parsed] = tryNice(() => JSON.parse(value as string) as object);
      if (parsed) {
        // @ts-ignore
        store.actions.setState(parsed);
      }
    })
    .finally(() => {
      // @ts-ignore
      store.actions.setState({
        isReady: true,
      });
    });

  return store;
}
