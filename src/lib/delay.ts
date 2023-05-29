/**
 * Delay returns a promise that resolves after the specified number of milliseconds.
 * @param [ms=500] - The number of milliseconds to delay.
 * @returns A promise that resolves after the specified time.
 */
export async function delay(ms = 500) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms),
  );
}
