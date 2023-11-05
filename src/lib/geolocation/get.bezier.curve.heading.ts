import type { Coordinate } from '@app/types/coordinate';

function quadraticBezierCurveCoordinate(
  start: Coordinate,
  end: Coordinate,
  control: Coordinate,
  t: number,
): Coordinate {
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

  return { latitude, longitude };
}

export function getHeadingOnQuadraticBezier(
  start: Coordinate,
  control: Coordinate,
  end: Coordinate,
  t: number = 0.5,
  epsilon: number = 1e-5,
): number {
  const currentPoint = quadraticBezierCurveCoordinate(start, control, end, t);
  const nextPoint = quadraticBezierCurveCoordinate(
    start,
    control,
    end,
    t + epsilon,
  );

  const deltaLatitude = nextPoint.latitude - currentPoint.latitude;
  const deltaLongitude = nextPoint.longitude - currentPoint.longitude;

  const angleRad = Math.atan2(deltaLongitude, deltaLatitude);
  const angleDeg = (angleRad * 180) / Math.PI;

  return angleDeg;
}
