import type MapView from 'react-native-maps';

import * as React from 'react';
import { View } from 'react-native';

import { compact } from 'lodash';

import { isNil } from '@app/lib/is.nil';
import { logger } from '@app/lib/logger';
import { Map } from '@app/components/map';
import { IS_IOS } from '@app/lib/platform';
import { withStyled } from '@app/lib/styled';

import { useFlight } from '../context';
import { AircraftMarker } from './marker.aircraft';
import { LocationMarkers } from './markers.location';
import { useAircraftPosition } from '../hooks/use.aircraft.position';

type Props = {
  height?: number;
};

export const TravelMap: React.FC<Props> = ({ height = 300 }) => {
  const map = React.useRef<MapView>(null);
  const flight = useFlight();
  const aircraftPositionReq = useAircraftPosition();
  const aircraftPosition = aircraftPositionReq.data?.aircraftPosition;

  React.useEffect(() => {
    if (flight && map.current) {
      logger.debug('Readjust map coordinates', map.current);
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
            bottom: 30,
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
    <Container height={height}>
      <Map
        pitchEnabled={IS_IOS}
        ref={map}
        style={{ height: height }}
        toolbarEnabled={IS_IOS}
        zoomControlEnabled={IS_IOS}
        zoomEnabled={IS_IOS}
        zoomTapEnabled={IS_IOS}
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
