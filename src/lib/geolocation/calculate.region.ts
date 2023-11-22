import type { Region } from 'react-native-maps';

import type { Coordinate } from '@app/types/coordinate';

/**
 * Calculates the region that encompasses a set of coordinates.
 *
 * @param {Coordinate[]} coordinates - An array of coordinates.
 * @param {number} [paddingFactor=1.1] - A factor to pad the region by (default is 1.1).
 * @return {Region} - The calculated region object containing latitude, latitudeDelta, longitude, and longitudeDelta.
 */
export function calculateRegion(
  coordinates: Array<Coordinate>,
  paddingFactor: number = 1.1,
): Region {
  let minLongitude = Number.MAX_VALUE;
  let maxLongitude = Number.MIN_VALUE;
  let minLatitude = Number.MAX_VALUE;
  let maxLatitude = Number.MIN_VALUE;

  // Find the minimum and maximum longitude and latitude
  coordinates.forEach((coord) => {
    minLongitude = Math.min(minLongitude, coord.longitude);
    maxLongitude = Math.max(maxLongitude, coord.longitude);
    minLatitude = Math.min(minLatitude, coord.latitude);
    maxLatitude = Math.max(maxLatitude, coord.latitude);
  });

  // Calculate center and delta values
  const longitude = (minLongitude + maxLongitude) / 2;
  const latitude = (minLatitude + maxLatitude) / 2;
  const longitudeDelta = (maxLongitude - minLongitude) * paddingFactor;
  const latitudeDelta = (maxLatitude - minLatitude) * paddingFactor;

  return {
    latitude,
    latitudeDelta,
    longitude,
    longitudeDelta,
  };
}
