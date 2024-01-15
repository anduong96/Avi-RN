import * as React from 'react';

import { isNil } from 'lodash';
import { useLayout } from '@react-native-community/hooks';

import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FaIcon } from '@app/components/icons.fontawesome';
import { AircraftAmenityType } from '@app/generated/server.gql';
import { useAircraftAmenitiesQuery } from '@app/generated/server.gql';

import { useFlight } from './context';
import { SectionTile, TileLabel } from './styles';

export const AmenitiesCard: React.FC = () => {
  const flight = useFlight();
  const theme = useTheme();
  const layout = useLayout();
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

  const getIcon = (type: AircraftAmenityType) => {
    switch (type) {
      case AircraftAmenityType.INTERNET:
        return 'wifi';
      case AircraftAmenityType.AC_POWER:
        return 'plug';
      case AircraftAmenityType.AUDIO:
        return 'headphones';
      case AircraftAmenityType.FOOD:
        return 'utensils';
      case AircraftAmenityType.VIDEO:
        return 'tv';
    }
  };

  const idealSize = 75;
  const count = Math.floor(layout.width / idealSize);
  const cellSize = Math.max(layout.width / count - theme.space.small, 0) ?? 0;

  return (
    <SectionTile>
      <TileLabel>Amenities</TileLabel>
      <Group
        direction="row"
        onLayout={layout.onLayout}
        style={{
          flexShrink: 1,
          flexWrap: 'wrap',
          gap: theme.space.tiny,
          height: '100%',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {data.map((item) => (
          <Group
            isCentered
            key={item.id}
            style={{
              backgroundColor: theme.pallette.grey[100],
              borderRadius: theme.borderRadius,
              height: cellSize,
              width: cellSize,
            }}
          >
            <FaIcon name={getIcon(item.type)} size={cellSize / 3} />
          </Group>
        ))}
      </Group>
    </SectionTile>
  );
};
