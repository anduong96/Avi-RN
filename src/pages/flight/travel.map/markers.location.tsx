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

import type { Coordinate } from '@app/types/coordinate';

import { withStyled } from '@app/lib/styled';
import { IS_ANDROID } from '@app/lib/platform';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { FlightStatus } from '@app/generated/server.gql';

import { useFlight } from '../context';

export const LocationMarkers: React.FC = () => {
  const markerSize = 10;
  const latitudeOffset = IS_ANDROID ? 1 : 0;
  const longitudeOffset = IS_ANDROID ? 1 : 0;
  const theme = useTheme();
  const flight = useFlight();
  const origin: Coordinate = {
    latitude: flight.Origin.latitude - latitudeOffset,
    longitude: flight.Origin.longitude - longitudeOffset,
  };
  const destination: Coordinate = {
    latitude: flight.Destination.latitude - latitudeOffset,
    longitude: flight.Destination.longitude - longitudeOffset,
  };
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
        coordinate={origin}
        identifier={flight.Origin.id}
        style={[
          {
            aspectRatio: 1,
            marginTop: 20,
            width: markerSize,
          },
          theme.presets.centered,
        ]}
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
        coordinate={destination}
        identifier={flight.Destination.id}
        style={{
          aspectRatio: 1,
          width: markerSize,
        }}
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
    backgroundColor: theme.pallette.secondary,
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
    elevation: 3,
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
