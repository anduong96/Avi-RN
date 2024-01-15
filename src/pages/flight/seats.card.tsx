import * as React from 'react';

import Qty from 'js-quantities';
import { isEmpty, isNil } from 'lodash';

import { format } from '@app/lib/format';
import { List } from '@app/components/list';
import { Group } from '@app/components/group';
import { CENTIMETER, INCHES } from '@app/constants';
import { Typography } from '@app/components/typography';
import { useAircraftSeatMetaQuery } from '@app/generated/server.gql';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { useIsAmericanSystem } from '@app/lib/hooks/use.measurement.system';

import { useFlight } from './context';
import { SectionTile, TileLabel } from './styles';

export const SeatsCard: React.FC = () => {
  const flight = useFlight();
  const isAmericanSystem = useIsAmericanSystem();
  const displayMeasurement = isAmericanSystem ? INCHES : CENTIMETER;
  const converter = Qty.swiftConverter(INCHES, displayMeasurement);
  const seats = useAircraftSeatMetaQuery({
    skip: isNil(flight.aircraftTailNumber),
    variables: {
      tailNumber: flight.aircraftTailNumber!,
    },
  });

  const data = seats.data?.aircraftSeatMeta;

  if (isNil(data) || isEmpty(data)) {
    return null;
  }

  const getRow = (
    first: string,
    second: string,
    third: string,
    isHeader?: boolean,
  ) => {
    return (
      <Group direction="row" gap={'small'} style={{ width: '100%' }}>
        <Group flexBasis={1} flexGrow={3} horizontalAlign="left">
          <Typography isBold={isHeader} type="small">
            {first}
          </Typography>
        </Group>
        <Group flexBasis={1} flexGrow={1} horizontalAlign="right">
          <Typography isBold={isHeader} type="small">
            {second}
          </Typography>
        </Group>
        <Group flexBasis={1} flexGrow={1} horizontalAlign="right">
          <Typography isBold={isHeader} type="small">
            {third}
          </Typography>
        </Group>
      </Group>
    );
  };

  return (
    <SectionTile>
      <TileLabel>Seating</TileLabel>
      <Group gap={'medium'}>
        {getRow('Name', 'Width', 'Pitch', true)}
        <List
          data={data}
          renderItem={(seat) => (
            <Group direction="row">
              {getRow(
                seat.name,
                format(
                  '%s %s',
                  Math.ceil(converter(seat.widthInches)),
                  displayMeasurement,
                ),
                format(
                  '%s %s',
                  Math.ceil(converter(seat.pitchInches)),
                  displayMeasurement,
                ),
              )}
            </Group>
          )}
          separator={() => <HorizontalDivider size="large" />}
          style={{ width: '100%' }}
        />
      </Group>
    </SectionTile>
  );
};
