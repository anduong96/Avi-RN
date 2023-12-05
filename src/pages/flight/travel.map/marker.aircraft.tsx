import * as React from 'react';
import { MapMarker, Polyline } from 'react-native-maps';

import { isNil } from 'lodash';
import tinycolor from 'tinycolor2';

import { withStyled } from '@app/lib/styled';
import { IS_ANDROID } from '@app/lib/platform';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FlightStatus } from '@app/generated/server.gql';
import { FaIcon } from '@app/components/icons.fontawesome';
import { createQuadraticBezierCurve } from '@app/lib/geolocation/create.bezier.curve';
import { findClosestPointOnBezier } from '@app/lib/geolocation/closest.to.bezier.curve';
import { getHeadingOnQuadraticBezier } from '@app/lib/geolocation/get.bezier.curve.heading';

import { useFlight } from '../context';
import { useAircraftPosition } from '../hooks/use.aircraft.position';
import { useIsOnDifferentFlight } from '../hooks/use.is.on.different.flight';

export const AircraftMarker: React.FC = () => {
  const theme = useTheme();
  const flight = useFlight();
  const request = useAircraftPosition();
  const position = request.data?.aircraftPosition;
  const isOnDifferentFlight = useIsOnDifferentFlight();
  const curvePoints = createQuadraticBezierCurve(
    flight.Origin,
    flight.Destination,
    position,
  );
  const lineWidth = IS_ANDROID ? 3 : 1;
  const lineDashPattern = IS_ANDROID ? [lineWidth, lineWidth + 4] : [lineWidth];
  const lineColor = theme.isDark
    ? theme.pallette.grey[600]
    : theme.pallette.grey[500];

  const completedLineColor = theme.pallette.primary;

  if (flight.status === FlightStatus.CANCELED) {
    return (
      <Polyline
        coordinates={curvePoints}
        strokeColor={lineColor}
        strokeWidth={lineWidth}
        zIndex={1}
      />
    );
  } else if (flight.status === FlightStatus.ARCHIVED) {
    return (
      <Polyline
        coordinates={curvePoints}
        strokeColor={completedLineColor}
        strokeWidth={lineWidth + 2}
        zIndex={1}
      />
    );
  } else if (isNil(position?.latitude) || isNil(position!.longitude)) {
    return (
      <Polyline
        coordinates={curvePoints}
        lineDashPattern={lineDashPattern}
        strokeColor={lineColor}
        strokeWidth={lineWidth}
        zIndex={1}
      />
    );
  }

  const latitude = position!.latitude;
  const longitude = position!.longitude;
  const coordinate = { latitude, longitude };

  if (isOnDifferentFlight) {
    return (
      <>
        <Polyline
          coordinates={curvePoints}
          lineDashPattern={lineDashPattern}
          strokeColor={lineColor}
          strokeWidth={lineWidth}
          zIndex={1}
        />
        <MapMarker
          coordinate={coordinate}
          style={{ elevation: 2, zIndex: 2 }}
          zIndex={2}
        >
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
      <MapMarker
        coordinate={closetCoordinate}
        style={{ elevation: 3, zIndex: 3 }}
      >
        <Plane
          color={theme.pallette.primary}
          name="plane-engines"
          rotation={planeRotation}
        />
      </MapMarker>
      <Polyline
        coordinates={curvePoints}
        lineDashPattern={lineDashPattern}
        strokeColor={lineColor}
        strokeWidth={lineWidth}
        zIndex={1}
      />
      <Polyline
        coordinates={completeCoordinates}
        strokeColor={completedLineColor}
        strokeWidth={lineWidth + 2}
        zIndex={2}
      />
    </>
  );
};

const Plane = withStyled<{ rotation?: number }, typeof FaIcon>(
  FaIcon,
  (theme, props) => [
    theme.presets.shadows[200],
    {
      elevation: 20,
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
