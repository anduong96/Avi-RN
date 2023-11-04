import * as React from 'react';
import { MapMarker, Polyline } from 'react-native-maps';

import { isNil } from 'lodash';
import tinycolor from 'tinycolor2';

import { format } from '@app/lib/format';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FaIcon } from '@app/components/icons.fontawesome';
import { createBezierCurve } from '@app/lib/geolocation/create.bezier.curve';
import {
  calculateDerivativeAtT,
  calculateRotationAngle,
  findClosestPointOnBezier,
} from '@app/lib/geolocation/closest.to.bezier.curve';

import { useFlight } from '../hooks/use.flight';
import { useAircraftPosition } from '../hooks/use.aircraft.position';

export const AircraftMarker: React.FC = () => {
  const theme = useTheme();
  const flight = useFlight(true);
  const request = useAircraftPosition();
  const position = request.data?.aircraftPosition;
  const curvePoints = createBezierCurve(flight.Origin, flight.Destination);
  const lineColor = theme.pallette.grey[200];
  const completedLineColor = theme.pallette.primary;

  if (isNil(position?.latitude) || isNil(position!.longitude)) {
    return (
      <Polyline
        coordinates={curvePoints}
        strokeColor={lineColor}
        strokeWidth={2}
      />
    );
  }

  const latitude = position!.latitude;
  const longitude = position!.longitude;
  const coordinate = { latitude, longitude };
  const isSameFlight =
    position!.destinationIata === flight.destinationIata &&
    position!.originIata === flight.originIata;

  if (!isSameFlight) {
    return (
      <>
        <Polyline
          coordinates={curvePoints}
          strokeColor={lineColor}
          strokeWidth={2}
        />
        <MapMarker coordinate={coordinate}>
          <Plane name="plane-engines" />
        </MapMarker>
      </>
    );
  }

  const closetCoordinate = findClosestPointOnBezier(curvePoints, coordinate);
  const progress = curvePoints.indexOf(closetCoordinate);
  const completeCoordinates = curvePoints.slice(0, progress);
  const planeRotation = calculateRotationAngle(
    calculateDerivativeAtT(
      0.5,
      curvePoints[0],
      curvePoints[curvePoints.length - 1]!,
      0.3,
    ),
  );

  return (
    <>
      <Polyline
        coordinates={curvePoints}
        strokeColor={lineColor}
        strokeWidth={2}
      />
      <Polyline
        coordinates={completeCoordinates}
        strokeColor={completedLineColor}
        strokeWidth={2}
      />
      <MapMarker coordinate={closetCoordinate} identifier="aircraft">
        <Plane name="plane-engines" rotation={planeRotation} />
      </MapMarker>
    </>
  );
};

const Plane = withStyled<{ rotation?: number }, typeof FaIcon>(
  FaIcon,
  (_, props) => ({
    transform: [
      {
        rotate: format('%sdeg', props.rotation),
      },
    ],
  }),
  (theme) => ({
    color: tinycolor(theme.pallette.active).brighten(10).toHexString(),
    size: 15,
  }),
);
