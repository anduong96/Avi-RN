import { isNil } from 'lodash';

import type { Coordinate } from '@app/types/coordinate';
import type { NullableObject } from '@app/types/nullable.properties';

function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = (Math.PI * coord1.latitude) / 180;
  const lat2 = (Math.PI * coord2.latitude) / 180;
  const dLat = lat2 - lat1;
  const dLon = (Math.PI * (coord2.longitude - coord1.longitude)) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export function createBezierCurve(
  startCoord: Coordinate,
  endCoord: Coordinate,
  controlPointFactor: number = 0.15,
): Coordinate[] {
  const distance = calculateDistance(startCoord, endCoord);
  const numPoints = Math.ceil(distance / 10);

  const controlPoint = {
    latitude:
      (startCoord.latitude + endCoord.latitude) / 2 -
      (startCoord.longitude - endCoord.longitude) * controlPointFactor,
    longitude:
      (startCoord.longitude + endCoord.longitude) / 2 -
      (endCoord.latitude - startCoord.latitude) * controlPointFactor,
  };

  // Generate a series of points along the curve
  const points: Coordinate[] = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const x =
      Math.pow(1 - t, 2) * startCoord.longitude +
      2 * (1 - t) * t * controlPoint.longitude +
      Math.pow(t, 2) * endCoord.longitude;
    const y =
      Math.pow(1 - t, 2) * startCoord.latitude +
      2 * (1 - t) * t * controlPoint.latitude +
      Math.pow(t, 2) * endCoord.latitude;

    points.push({ latitude: y, longitude: x });
  }

  return points;
}

export function createQuadraticBezierCurve(
  start: Coordinate,
  end: Coordinate,
  control?: NullableObject<Coordinate>,
  numPoints: number = 100,
): Coordinate[] {
  if (isNil(control) || isNil(control?.latitude) || isNil(control?.longitude)) {
    return createBezierCurve(start, end);
  }

  const curve: Coordinate[] = [];

  for (let t = 0; t <= 1; t += 1 / numPoints) {
    const invT = 1 - t;
    const invT2 = invT * invT;
    const t2 = t * t;

    const latitude =
      start.latitude * invT2 +
      2 * control.latitude * invT * t +
      end.latitude * t2;
    const longitude =
      start.longitude * invT2 +
      2 * control.longitude * invT * t +
      end.longitude * t2;

    curve.push({ latitude, longitude });
  }

  return curve;
}
