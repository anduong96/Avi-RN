import * as React from 'react';
import { View } from 'react-native';
import { MapMarker } from 'react-native-maps';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import tinycolor from 'tinycolor2';

import { withStyled } from '@app/lib/styled';
import { Typography } from '@app/components/typography';
import { FlightStatus } from '@app/generated/server.gql';

import { useFlight } from '../context';

export const LocationMarkers: React.FC = () => {
  const flight = useFlight();
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
      <MapMarker
        coordinate={{
          latitude: flight.Origin.latitude,
          longitude: flight.Origin.longitude,
        }}
        identifier={flight.Origin.id}
        style={{ aspectRatio: 1, width: 10 }}
      >
        <MarkerPulse
          style={[
            (flight.status === FlightStatus.SCHEDULED ||
              flight.status === FlightStatus.DELAYED) &&
              markerStyle,
          ]}
        />
        <MarkerContent />
        <MarkerLabel>
          {flight.Origin.cityName || flight.Origin.cityCode}
        </MarkerLabel>
      </MapMarker>
      <MapMarker
        coordinate={{
          latitude: flight.Destination.latitude,
          longitude: flight.Destination.longitude,
        }}
        identifier={flight.Destination.id}
        style={{ aspectRatio: 1, width: 10 }}
      >
        <MarkerPulse
          style={[
            (flight.status === FlightStatus.LANDED ||
              flight.status === FlightStatus.DEPARTED) &&
              markerStyle,
          ]}
        />
        <MarkerContent />
        <MarkerLabel>
          {flight.Destination.cityName || flight.Destination.cityCode}
        </MarkerLabel>
      </MapMarker>
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
    backgroundColor: tinycolor(theme.pallette.background)
      .setAlpha(0.4)
      .toRgbString(),
    borderRadius: theme.roundRadius,
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
]);

const MarkerLabel = withStyled(
  Typography,
  (theme) => [
    {
      bottom: -(theme.space.tiny + theme.typography.presets.tiny.fontSize),
      left: -theme.typography.presets.tiny.fontSize / 2,
      position: 'absolute',
      width: 50,
    },
  ],
  {
    isBold: true,
    numberOfLines: 1,
    type: 'tiny',
  },
);
