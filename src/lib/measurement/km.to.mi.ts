/**
 * The function converts kilometers to miles.
 * @param {number} km - The parameter "km" is a number representing the distance in kilometers.
 * @returns the value of `km` multiplied by 0.621371, which is the conversion factor from kilometers to
 * miles.
 */
export function kmToMi(km: number) {
  return km * 0.621371;
}

/**
 * The function `miToKm` converts miles to kilometers by multiplying the input value by 1.60934.
 * @param {number} mi - The parameter `mi` represents the distance in miles that you want to convert to
 * kilometers.
 * @returns the value of `mi` multiplied by 1.60934, which converts miles to kilometers.
 */
export function miToKm(mi: number) {
  return mi * 1.60934;
}
