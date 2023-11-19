import * as React from 'react';

/**
 * The `useEffectRef` function returns a ref object that keeps track of a value and updates it whenever
 * the value changes.
 * @param {T} value - The `value` parameter is the value that you want to store in the `valueRef` ref
 * object.
 * @returns The `useEffectRef` function returns a `valueRef` object.
 */
export function useEffectRef<T>(value: T) {
  const valueRef = React.useRef(value);

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}
