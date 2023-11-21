export enum MAP_PROVIDERS {
  BASE_MAPS_DARK = 'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
  BASE_MAPS_LIGHT = 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  MAP_TILER_BACKDROP = 'https://api.maptiler.com/maps/backdrop/{z}/{x}/{y}@2x.png',
  MAP_TILER_DARK = 'https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}@2x.png',
  MAP_TILER_LIGHT = 'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}@2x.png',
  MAP_TILER_TERRAIN_MESH = 'https://api.maptiler.com/tiles/terrain-quantized-mesh-v2/{z}/{x}/{y}.quantized-mesh-1.0',
  MAP_TILER_TONER = 'https://api.maptiler.com/maps/toner-v2/{z}/{x}/{y}@2x.png',
  STAMEN_MAPS_TONER = 'https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}.png',
  WIKIMEDIA = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
}
