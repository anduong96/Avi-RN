import * as React from 'react';
import { View } from 'react-native';
import { MapMarker } from 'react-native-maps';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';

import { useFlight } from '../hooks/use.flight';

export const LocationMarkers: React.FC = () => {
  const flight = useFlight(true);
  const markerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(2, { duration: 500 }),
            withTiming(1, { duration: 500 }),
          ),
          -1,
          true,
        ),
      },
    ],
  }));

  return (
    <>
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
    </>
  );
};

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
    borderColor: theme.pallette.primary,
    borderRadius: theme.roundRadius,
    borderWidth: 1,
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
]);
