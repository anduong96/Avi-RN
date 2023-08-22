import * as React from 'react';

import { logger } from '../logger';

/**
 * The `useAwaitedMount` function is a custom React hook that waits for a promise to resolve before
 * setting the value in the component state.
 * @param promise - The `promise` parameter is a function that returns a Promise. This Promise
 * represents an asynchronous operation that will eventually resolve to a value of type `T`.
 * @returns The `useAwaitedMount` function returns the value that is resolved from the promise passed
 * as an argument.
 */
export function useAwaitedMount<T>(promise: () => Promise<T>) {
  const [value, setValue] = React.useState<T>();

  React.useEffect(() => {
    promise()
      .then((nextValue) => setValue(() => nextValue))
      .catch((e) => {
        logger.error(e);
        setValue(() => undefined);
      });
  }, [promise]);

  return value;
}
