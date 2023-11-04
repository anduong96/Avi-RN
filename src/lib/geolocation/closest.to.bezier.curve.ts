import type { Coordinate } from '@app/types/coordinate';

// Function to calculate the distance between two coordinates
function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const lat1 = coord1.latitude;
  const lon1 = coord1.longitude;
  const lat2 = coord2.latitude;
  const lon2 = coord2.longitude;

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  // Convert distance to kilometers
  dist = dist * 1.609344;

  return dist;
}

export function findClosestPointOnBezier(
  bezierCurve: Coordinate[],
  point: Coordinate,
): Coordinate {
  let closestPoint = bezierCurve[0];
  let minDistance = calculateDistance(point, bezierCurve[0]);

  for (let i = 1; i < bezierCurve.length; i++) {
    const distance = calculateDistance(point, bezierCurve[i]);

    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = bezierCurve[i];
    }
  }

  return closestPoint;
}

// Function to calculate the derivative of a Bezier curve at a specific t value
export function calculateDerivativeAtT(
  t: number,
  startCoord: Coordinate,
  endCoord: Coordinate,
  controlPointFactor: number,
): Coordinate {
  const dX =
    2 *
    (1 - t) *
    (controlPointFactor * (endCoord.longitude - startCoord.longitude));
  const dY =
    2 *
    (1 - t) *
    (controlPointFactor * (endCoord.latitude - startCoord.latitude));
  return { latitude: dY, longitude: dX };
}

// Function to calculate the angle between the tangent vector and the east direction
export function calculateRotationAngle(tangentVector: Coordinate): number {
  // Calculate the angle in radians
  const angle = Math.atan2(tangentVector.latitude, tangentVector.longitude);

  // Convert the angle to degrees and adjust it to fit your image orientation
  const degrees = (angle * 180) / Math.PI;

  // Adjust the angle based on the image orientation
  // For example, if the image is initially pointing east, you can add 90 degrees
  const adjustedDegrees = degrees + 90;

  return adjustedDegrees;
}
