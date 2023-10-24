import { format } from 'util';

import { kmToMi } from '../measurement/km.to.mi';

/**
 * The function `getFlightDistance` calculates the flight distance in either kilometers or miles based
 * on the input distance and unit preference.
 * @param {number} [distanceKm=0] - The distance in kilometers.
 * @param {boolean} [useMetric=true] - A boolean value indicating whether to use metric units
 * (kilometers) or not.
 * @returns a formatted string that represents the flight distance. The distance and unit are
 * determined based on the useMetric parameter. If useMetric is true, the distance is in kilometers and
 * the unit is 'km'. If useMetric is false, the distance is converted from kilometers to miles using
 * the kmToMi function and the unit is 'mi'. The formatted string is created using the format function
 */
export function getFlightDistance(
  distanceKm: number = 0,
  useMetric: boolean = true,
) {
  const [distance, unit] = useMetric
    ? [distanceKm, 'km']
    : [kmToMi(distanceKm), 'mi'];

  return format('%s %s', distance, unit);
}
