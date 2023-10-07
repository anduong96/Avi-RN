import * as React from 'react';

/**
 * The `useSubscription` function is a custom hook in TypeScript that takes a subscription function and
 * a dependency list, and sets up a subscription using the function and cleans up the subscription when
 * the component unmounts.
 * @param {T} subscribeFn - The `subscribeFn` parameter is a function that returns another function.
 * The returned function is used to unsubscribe or clean up any resources when the component is
 * unmounted or when the dependencies change.
 * @param deps - The `deps` parameter is a dependency list that determines when the effect should be
 * re-run. It is similar to the dependency array in the `useEffect` hook. If any of the values in the
 * dependency list change, the effect will be re-run.
 */
export function useSubscription<T extends () => () => void>(
  subscribeFn: T,
  deps: React.DependencyList,
) {
  React.useEffect(() => {
    const unsub = subscribeFn();
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
