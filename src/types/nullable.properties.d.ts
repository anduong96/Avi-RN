export type NullableObject<T extends object> = {
  [K: keyof T]: T[K] | null;
};
