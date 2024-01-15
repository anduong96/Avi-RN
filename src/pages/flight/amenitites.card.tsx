import * as React from 'react';

import { isNil } from 'lodash';

import { Group } from '@app/components/group';
import { useAircraftAmenitiesQuery } from '@app/generated/server.gql';

import { useFlight } from './context';
import { SectionTile, TileLabel } from './styles';

export const AmenitiesCard: React.FC = () => {
  const flight = useFlight();
  const seats = useAircraftAmenitiesQuery({
    skip: isNil(flight.aircraftTailNumber),
    variables: {
      tailNumber: flight.aircraftTailNumber!,
    },
  });

  const data = seats.data?.aircraftAmenities;

  if (isNil(data)) {
    return null;
  }

  return (
    <SectionTile>
      <TileLabel>Amenities</TileLabel>
      <Group></Group>
    </SectionTile>
  );
};
