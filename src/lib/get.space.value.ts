import type { SpaceKeys, Theme } from '@app/themes';

/**
 * The function `getSpaceValue` returns the value of a space key from a theme object, or the input
 * number if it is not a key.
 * @param {SpaceKeys | number} value - The `value` parameter can be either a `SpaceKeys` type or a
 * number. The `SpaceKeys` type is a union type that represents the keys of the `theme.space` object.
 * @param {Theme} theme - The `theme` parameter is an object that represents the theme of the
 * application. It contains various properties, including `space`, which is an object that maps space
 * keys to their corresponding values.
 * @returns either the input value if it is a number, or the corresponding value from the theme's space
 * object if the input value is a key in the SpaceKeys enum.
 */
export function getSpaceValue(value: SpaceKeys | number, theme: Theme) {
  return typeof value === 'number' ? value : theme.space[value];
}
