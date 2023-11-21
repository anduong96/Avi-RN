import type { MapViewProps } from 'react-native-maps';

import * as React from 'react';
import MapView, { MAP_TYPES } from 'react-native-maps';

export const IosMap = React.forwardRef<MapView, Omit<MapViewProps, 'mapType'>>(
  (props, ref) => {
    return (
      <MapView mapType={MAP_TYPES.TERRAIN} ref={ref} {...props}>
        {props.children}
      </MapView>
    );
  },
);
