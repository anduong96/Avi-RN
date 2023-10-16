import type { ActionsMap, Store } from 'tiamut/dist/types';

import { tryNice } from 'try-nice';

import { logger } from '@app/lib/logger';
import { storage } from '@app/lib/storage';

export function withLocalStorage<
  State extends {
    isReady?: boolean;
  },
  A extends ActionsMap<State> & {
    setState: (state: State, nextState: Partial<State>) => void;
  },
>(key: string, store: Pick<Store<State, A>, 'actions' | 'subscribe'>) {
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  store.actions.setState({ ...parsed, isReady: true });

  return store;
}
