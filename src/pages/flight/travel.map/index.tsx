import type MapView from 'react-native-maps';

import * as React from 'react';
import { View } from 'react-native';

import { compact } from 'lodash';

import { isNil } from '@app/lib/is.nil';
import { Map } from '@app/components/map';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { calculateRegion } from '@app/lib/geolocation/calculate.region';

import { useFlight } from '../context';
import { AircraftMarker } from './marker.aircraft';
import { LocationMarkers } from './markers.location';
import { useAircraftPosition } from '../hooks/use.aircraft.position';

type Props = {
  height?: number;
};

export const TravelMap: React.FC<Props> = ({ height = 300 }) => {
  const theme = useTheme();
  const map = React.useRef<MapView>(null);
  const flight = useFlight();
  const aircraftPositionReq = useAircraftPosition();
  const aircraftPosition = aircraftPositionReq.data?.aircraftPosition;
  const region = React.useMemo(
    () =>
      !flight
        ? null
        : calculateRegion(
            compact([
              flight.Origin,
              flight.Destination,
              !isNil(aircraftPosition?.latitude) &&
                !isNil(aircraftPosition?.longitude) && {
                  latitude: aircraftPosition!.latitude,
                  longitude: aircraftPosition!.longitude,
                },
            ]),
          ),
    [flight, aircraftPosition],
  );

  if (!flight || !region) {
    return null;
  }

  return (
    <Container height={height}>
      <Map
        cacheEnabled
        initialRegion={region}
        loadingBackgroundColor={theme.pallette.background}
        ref={map}
        showsBuildings={false}
        showsIndoorLevelPicker={false}
        showsIndoors={false}
        style={{ height }}
        toolbarEnabled
        userInterfaceStyle={theme.isDark ? 'dark' : 'light'}
      >
        <AircraftMarker />
        <LocationMarkers />
      </Map>
    </Container>
  );
};

const Container = withStyled<Pick<Props, 'height'>, typeof View>(
  View,
  (_, props) => [
    {
      height: props.height,
    },
  ],
);
