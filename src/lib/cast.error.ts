import type { AppleError } from '@invertase/react-native-apple-authentication';

export function castError(value: unknown): Error {
  if (value instanceof Error) {
    return value as Error;
  }

  throw new Error('Value is not an error');
}

export function castAppleAuthError(value: unknown) {
  return value as Error & { code: AppleError };
}

export function castGoogleAuthError(value: unknown) {
  return value as Error & { code: string };
}
