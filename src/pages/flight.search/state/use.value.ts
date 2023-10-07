import { State } from '.';

type S = ReturnType<(typeof State)['getState']>;

export function useValue<K extends keyof S, F extends S[K]>(
  key: K,
  fallback?: F,
): F extends undefined ? S[K] : NonNullable<S[K]> {
  const value = State.useSelect((state) => state[key]) ?? (fallback as any);
  return value;
}
