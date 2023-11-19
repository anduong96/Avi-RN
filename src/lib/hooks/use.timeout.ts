import * as React from 'react';

import { useEffectRef } from './use.effect.ref';

/**
 * The `useTimeout` function is a custom hook in TypeScript that executes a callback function after a
 * specified timeout period.
 * @param callback - The `callback` parameter is a function that will be executed after the specified
 * timeout.
 * @param {number} timeoutMs - The `timeoutMs` parameter is the duration in milliseconds for the
 * timeout. It specifies how long the code should wait before executing the callback function.
 */
export function useTimeout(callback: () => void, timeoutMs: number) {
  const callbackRef = useEffectRef(callback);

  React.useEffect(() => {
    if (!timeoutMs || timeoutMs < 0) {
      return;
    }

    const timeoutID = setTimeout(() => {
      callbackRef.current();
    }, timeoutMs);

    return () => clearTimeout(timeoutID);
  }, [callbackRef, timeoutMs]);
}
