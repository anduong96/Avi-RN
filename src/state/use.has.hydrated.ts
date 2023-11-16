import * as React from 'react';

import { format } from '@app/lib/format';
import { logger } from '@app/lib/logger';

/**
 * The `useHasHydrated` function is a custom hook in TypeScript that checks if a store has finished
 * hydrating and returns a boolean value indicating whether it has or not.
 * @param {S} store - The `store` parameter is an object that should have a `persist` property. The
 * `persist` property should be an object that has the following methods:
 * @returns The function `useHasHydrated` returns a boolean value indicating whether the store has
 * finished hydration or not.
 */
export function useHasHydrated<
  S extends {
    name: string;
    persist: {
      hasHydrated: () => boolean;
      onFinishHydration: (fn: () => void) => () => void;
      onHydrate: (fn: () => void) => () => void;
    };
  },
>(store: S) {
  const [hydrated, setHydrated] = React.useState(store.persist.hasHydrated());

  React.useEffect(() => {
    if (store.persist.hasHydrated()) {
      logger.debug(format('Store %s hydrated', store.name));
      setHydrated(true);
      return;
    }

    const removeHydrateListener = store.persist.onHydrate(() =>
      setHydrated(false),
    );

    const removeFinishHydrationListener = store.persist.onFinishHydration(
      () => {
        setHydrated(false);
        logger.debug(format('Store %s hydrated', store.name));
      },
    );

    return () => {
      removeHydrateListener();
      removeFinishHydrationListener();
    };
  }, [store]);

  return hydrated;
}
