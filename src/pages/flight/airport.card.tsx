import * as React from 'react';

import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';

import { useFlight } from './context';
import { SectionTile, TileLabel } from './styles';

type Props = {
  type: 'arrival' | 'departure';
};

export const AirportCard: React.FC<Props> = ({ type }) => {
  const flight = useFlight();
  const airport = type === 'departure' ? flight.Origin : flight.Destination;

  return (
    <SectionTile>
      <TileLabel>Departure Airport</TileLabel>
      <Group gap="tiny">
        <Typography isCentered type="h1">
          {airport.name}
        </Typography>
        <Typography isCentered type="h4">
          {airport.cityName}, {airport.countryCode}
        </Typography>
      </Group>
    </SectionTile>
  );
};
