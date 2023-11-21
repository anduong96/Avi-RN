import * as React from 'react';
import { View } from 'react-native';
import MapView, { MAP_TYPES, MapUrlTile } from 'react-native-maps';

import { compact } from 'lodash';

import { isNil } from '@app/lib/is.nil';
import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { IS_ANDROID } from '@app/lib/platform';

import { useFlight } from '../context';
import { AircraftMarker } from './marker.aircraft';
import { LocationMarkers } from './markers.location';
import { useAircraftPosition } from '../hooks/use.aircraft.position';

export const TravelMap: React.FC = () => {
  const map = React.useRef<MapView>(null);
  const flight = useFlight();
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
      <Map
        initialRegion={{
          latitude: flight.Origin.latitude,
          latitudeDelta: 0,
          longitude: flight.Origin.longitude,
          longitudeDelta: 0,
        }}
        ref={map}
      >
        <MapUrlTile
          maximumZ={15}
          style={{ elevation: 1000 }}
          urlTemplate="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zIndex={-1}
        />
        {/* <AircraftMarker /> */}
        {/* <LocationMarkers /> */}
      </Map>
    </Container>
  );
};

const MAP_HEIGHT = 200;

const Map = withStyled(
  MapView,
  () => [
    {
      height: MAP_HEIGHT,
    },
  ],
  {
    liteMode: true,
    mapType: IS_ANDROID ? MAP_TYPES.NONE : MAP_TYPES.TERRAIN,
  },
);

const Container = withStyled(View, () => [
  {
    height: MAP_HEIGHT,
  },
]);
