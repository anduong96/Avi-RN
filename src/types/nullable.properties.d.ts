export type NullableObject<T extends object> =
  | {
      [K in keyof T]?: T[K] | null;
    }
  | null;
