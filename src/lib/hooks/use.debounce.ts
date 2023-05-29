import * as React from 'react';

/**
 * UseDebounce returns a debounced value. It will only update that value after a specified delay, and
 * if the value has changed.
 * @param {T} value - The value to be debounced.
 * @param [delay=500] - The delay in milliseconds before the callback is invoked.
 * @returns A function that returns a debounced value.
 */
export function useDebounce<T>(value: T, delay = 500) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
