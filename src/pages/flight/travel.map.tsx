import * as React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { MapMarker, Polyline } from 'react-native-maps';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import tinycolor from 'tinycolor2';

import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { createBezierCurve } from '@app/lib/geolocation/create.bezier.curve';

type Props = {
  flightID: string;
};

export const TravelMap: React.FC<Props> = ({ flightID }) => {
  const map = React.useRef<MapView>(null);
  const theme = useTheme();
  const request = useGetFlightQuery({ variables: { flightID } });
  const flight = request.data?.flight;
  const markerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(3, { duration: 500 }),
            withTiming(1, { duration: 500 }),
          ),
          -1,
          true,
        ),
      },
    ],
  }));

  React.useEffect(() => {
    if (flight && map.current) {
      logger.debug('Readjust map coordinates');
      map.current.fitToCoordinates([flight.Origin, flight.Destination], {
        edgePadding: {
          bottom: 100,
          left: 30,
          right: 30,
          top: 50,
        },
      });
    }
  }, [flight]);

  if (!flight) {
    return null;
  }

  return (
    <Container>
      <Map ref={map}>
        {[flight.Origin, flight.Destination].map((location) => (
          <MapMarker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            identifier={location.id}
            key={location.id}
            style={{ aspectRatio: 1, width: 10 }}
          >
            <MarkerPulse style={markerStyle} />
            <MarkerContent />
          </MapMarker>
        ))}
        <Polyline
          coordinates={createBezierCurve(flight.Origin, flight.Destination)}
          strokeColor={tinycolor(theme.pallette.primary)
            .darken(1)
            .toHexString()}
          strokeWidth={2}
        />
      </Map>
      <GradientContainer>
        <Gradient colors={['transparent', theme.pallette.background]} />
        <GradientPad />
      </GradientContainer>
    </Container>
  );
};

const MAP_HEIGHT = 250;

const Map = withStyled(MapView, () => [
  {
    height: MAP_HEIGHT - 10,
  },
]);

const Container = withStyled(View, () => [
  {
    height: MAP_HEIGHT,
  },
]);

const MarkerContent = withStyled(View, (theme) => [
  theme.presets.shadows[200],
  {
    aspectRatio: 1,
    backgroundColor: theme.pallette.primary,
    borderRadius: theme.roundRadius,
    height: '100%',
  },
]);

const MarkerPulse = withStyled(Animated.View, (theme) => [
  {
    borderColor: theme.pallette.background,
    borderRadius: theme.roundRadius,
    borderWidth: 1,
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
]);

const Gradient = withStyled(LinearGradient, () => [
  {
    flexGrow: 1,
  },
]);

const GradientPad = withStyled(View, (theme) => ({
  backgroundColor: theme.pallette.background,
  height: 20,
}));

const GradientContainer = withStyled(View, {
  bottom: -10,
  height: 80,
  left: 0,
  position: 'absolute',
  right: 0,
});
