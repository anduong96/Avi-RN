/**
 * The function toggles between two values and returns the next value if the current value is equal to
 * the first value, otherwise it returns an optional off value.
 * @param {T} current - The current value that needs to be toggled.
 * @param {T} nextValue - `nextValue` is the value that will be returned if the `current` value is not
 * equal to it. If `current` is equal to `nextValue`, then the `offValue` will be returned instead.
 * @param {E} [offValue] - The `offValue` parameter is an optional parameter of type `E`. It is used as
 * the return value when the `current` value is equal to the `nextValue` parameter. If `offValue` is
 * not provided, the `nextValue` parameter is returned instead.
 * @returns The function `toggleValue` returns the `offValue` parameter if the `current` parameter is
 * equal to the `nextValue` parameter, otherwise it returns the `nextValue` parameter. The types of the
 * parameters are generic, meaning they can be of any type.
 */
export function toggleValue<T, E>(current: T, nextValue: T, offValue?: E) {
  return current === nextValue ? offValue : nextValue;
}
