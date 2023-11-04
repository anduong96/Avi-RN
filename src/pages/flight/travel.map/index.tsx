import * as React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';

import { compact } from 'lodash';

import { isNil } from '@app/lib/is.nil';
import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { useFlight } from '../hooks/use.flight';
import { AircraftMarker } from './marker.aircraft';
import { LocationMarkers } from './markers.location';
import { useAircraftPosition } from '../hooks/use.aircraft.position';

export const TravelMap: React.FC = () => {
  const map = React.useRef<MapView>(null);
  const theme = useTheme();
  const flight = useFlight(true);
  const aircraftPositionReq = useAircraftPosition();
  const aircraftPosition = aircraftPositionReq.data?.aircraftPosition;

  React.useEffect(() => {
    if (flight && map.current) {
      logger.debug('Readjust map coordinates');
      map.current.fitToCoordinates(
        compact([
          flight.Origin,
          flight.Destination,
          !isNil(aircraftPosition?.latitude) &&
            !isNil(aircraftPosition?.longitude) && {
              latitude: aircraftPosition!.latitude,
              longitude: aircraftPosition!.longitude,
            },
        ]),
        {
          edgePadding: {
            bottom: 50,
            left: 30,
            right: 30,
            top: 50,
          },
        },
      );
    }
  }, [flight, aircraftPosition]);

  if (!flight) {
    return null;
  }

  return (
    <Container>
      <Map ref={map}>
        <LocationMarkers />
        <AircraftMarker />
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
