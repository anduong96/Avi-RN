import * as React from 'react';
import { MapMarker, Polyline } from 'react-native-maps';

import { isNil } from 'lodash';
import tinycolor from 'tinycolor2';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FaIcon } from '@app/components/icons.fontawesome';
import { createQuadraticBezierCurve } from '@app/lib/geolocation/create.bezier.curve';
import { findClosestPointOnBezier } from '@app/lib/geolocation/closest.to.bezier.curve';
import { getHeadingOnQuadraticBezier } from '@app/lib/geolocation/get.bezier.curve.heading';

import { useFlight } from '../context';
import { useAircraftPosition } from '../hooks/use.aircraft.position';

export const AircraftMarker: React.FC = () => {
  const theme = useTheme();
  const flight = useFlight();
  const request = useAircraftPosition();
  const position = request.data?.aircraftPosition;
  const curvePoints = createQuadraticBezierCurve(
    flight.Origin,
    flight.Destination,
    position,
  );
  const lineDashPattern = [2];
  const lineWidth = 1;
  const lineColor = theme.pallette.grey[600];
  const completedLineColor = theme.pallette.primary;

  if (isNil(position?.latitude) || isNil(position!.longitude)) {
    return (
      <Polyline
        coordinates={curvePoints}
        lineDashPattern={lineDashPattern}
        strokeColor={lineColor}
        strokeWidth={lineWidth}
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
          lineDashPattern={lineDashPattern}
          strokeColor={lineColor}
          strokeWidth={lineWidth}
        />
        <MapMarker coordinate={coordinate}>
          <Plane
            color={tinycolor(theme.pallette.danger).toHexString()}
            name="plane-engines"
            rotation={getHeadingOnQuadraticBezier(
              coordinate,
              flight.Origin,
              coordinate,
            )}
          />
        </MapMarker>
      </>
    );
  }

  const closetCoordinate = findClosestPointOnBezier(curvePoints, coordinate);
  const progress = curvePoints.indexOf(closetCoordinate);
  const completeCoordinates = curvePoints.slice(0, progress + 2);
  const planeRotation = getHeadingOnQuadraticBezier(
    flight.Origin,
    flight.Destination,
    coordinate,
  );

  return (
    <>
      <Polyline
        coordinates={curvePoints}
        lineDashPattern={lineDashPattern}
        strokeColor={lineColor}
        strokeWidth={lineWidth}
      />
      <Polyline
        coordinates={completeCoordinates}
        strokeColor={completedLineColor}
        strokeWidth={lineWidth + 2}
      />
      <MapMarker coordinate={closetCoordinate}>
        <Plane
          color={tinycolor(theme.pallette.active).toHexString()}
          name="plane-engines"
          rotation={planeRotation}
        />
      </MapMarker>
    </>
  );
};

const Plane = withStyled<{ rotation?: number }, typeof FaIcon>(
  FaIcon,
  (theme, props) => [
    theme.presets.shadows[200],
    {
      shadowOffset: {
        height: -5,
        width: -5,
      },
      shadowOpacity: 0.6,
    },
    !isNil(props.rotation) && {
      transform: [
        {
          rotate: `${props.rotation - 90}deg`,
        },
      ],
    },
  ],
  () => ({
    size: 20,
  }),
);
