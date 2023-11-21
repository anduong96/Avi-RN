import type { MapViewProps } from 'react-native-maps';

import * as React from 'react';
import MapView, { MAP_TYPES, UrlTile } from 'react-native-maps';

import remoteConfig from '@react-native-firebase/remote-config';

import { useTheme } from '@app/lib/hooks/use.theme';

import { MAP_PROVIDERS } from './constants';

const MAP_TILER_API_KEY = remoteConfig()
  .getValue('MAP_TILER_API_KEY')
  .asString();

export const AndroidMap = React.forwardRef<
  MapView,
  Omit<MapViewProps, 'mapType'>
>((props, ref) => {
  const theme = useTheme();
  const mapUrl = MAP_TILER_API_KEY
    ? theme.isDark
      ? MAP_PROVIDERS.MAP_TILER_DARK + `?key=${MAP_TILER_API_KEY}`
      : MAP_PROVIDERS.MAP_TILER_LIGHT + `?key=${MAP_TILER_API_KEY}`
    : theme.isDark
      ? MAP_PROVIDERS.BASE_MAPS_DARK
      : MAP_PROVIDERS.BASE_MAPS_LIGHT;

  return (
    <MapView mapType={MAP_TYPES.NONE} ref={ref} {...props}>
      {props.children}
      <UrlTile urlTemplate={mapUrl} />
    </MapView>
  );
});
