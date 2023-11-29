import * as React from 'react';

import { isNil } from 'lodash';
import Qty from 'js-quantities';

import { List } from '@app/components/list';
import { Group } from '@app/components/group';
import { KILOGRAMS, POUNDS } from '@app/constants';
import { Typography } from '@app/components/typography';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { useIsAmericanSystem } from '@app/lib/hooks/use.measurement.system';

import { useFlight } from './context';
import { SectionTile, TileLabel } from './styles';

export const EmissionCard: React.FC = () => {
  const flight = useFlight();
  const isAmericanSystem = useIsAmericanSystem();
  const displayMeasurement = isAmericanSystem ? POUNDS : KILOGRAMS;
  const converter = Qty.swiftConverter('kg', displayMeasurement);
  const data = [
    ['Economy', flight.co2EmissionKgEconomy],
    ['Eco+', flight.co2EmissionKgEco],
    ['Business Class', flight.co2EmissionKgBusiness],
    ['First Class', flight.co2EmissionKgFirst],
  ];

  if (data.every((entry) => isNil(entry[1]))) {
    return null;
  }

  return (
    <SectionTile>
      <TileLabel>Emission</TileLabel>
      <List
        data={data}
        renderItem={([label, value]) => (
          <Group direction="row" style={{ justifyContent: 'space-between' }}>
            <Typography type="h3">{label}</Typography>
            <Typography type="h3">
              {Math.ceil(converter(Number(value)))} {displayMeasurement}
            </Typography>
          </Group>
        )}
        separator={() => <HorizontalDivider size="large" />}
        style={{ width: '100%' }}
      />
    </SectionTile>
  );
};
