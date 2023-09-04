import type { ActionsMap, Store } from 'tiamut/dist/types';

import { logger } from '@app/lib/logger';
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
  store.subscribe(async (value) => {
    if (value.isReady) {
      logger.debug('Saving', key, value);
      storage.set(key, JSON.stringify(value));
    }
  });

  const previousState = storage.getString(key);
  const [parsed] = tryNice((): object =>
    previousState ? JSON.parse(previousState) : {},
  );

  logger.debug(key, 'restored state', parsed);
  // @ts-ignore
  store.actions.setState({ ...parsed, isReady: true });

  return store;
}
