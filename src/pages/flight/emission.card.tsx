import * as React from 'react';

import { isNil } from 'lodash';

import { List } from '@app/components/list';
import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { useMeasurementDisplay } from '@app/lib/hooks/use.measurement.display';

import { useFlight } from './context';
import { SectionTile, TileLabel } from './styles';

export const EmissionCard: React.FC = () => {
  const flight = useFlight();
  const {
    co2EmissionKgBusiness: business,
    co2EmissionKgEco: eco,
    co2EmissionKgEconomy: economy,
    co2EmissionKgFirst: first,
  } = flight;

  const firstEmission = useMeasurementDisplay('kg', first);
  const ecoEmission = useMeasurementDisplay('kg', eco);
  const economyEmission = useMeasurementDisplay('kg', economy);
  const businessEmission = useMeasurementDisplay('kg', business);

  if ([eco, economy, business, first].every(isNil)) {
    return null;
  }

  return (
    <SectionTile>
      <TileLabel>Emission</TileLabel>
      <List
        data={[
          ['Economy', economyEmission],
          ['Eco+', ecoEmission],
          ['Business Class', businessEmission],
          ['First Class', firstEmission],
        ]}
        renderItem={([label, value]) => (
          <Group direction="row" style={{ justifyContent: 'space-between' }}>
            <Typography type="h3">{label}</Typography>
            <Typography type="h3">{value}</Typography>
          </Group>
        )}
        separator={() => <HorizontalDivider size="large" />}
        style={{ width: '100%' }}
      />
    </SectionTile>
  );
};
