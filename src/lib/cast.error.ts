export function castError(value: unknown): Error {
  if (value instanceof Error) {
    return value as Error;
  }

  throw new Error('Value is not an error');
}
