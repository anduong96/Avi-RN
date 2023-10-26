import * as React from 'react';
import { Text, View } from 'react-native';

import { isNil } from 'lodash';

import type { Flight } from '@app/generated/server.gql';

import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { useMeasurementDisplay } from '@app/lib/hooks/use.measurement.display';

type Props = {
  flightID: Flight['id'];
};

export const EmissionCard: React.FC<Props> = ({ flightID }) => {
  const response = useGetFlightQuery({
    variables: {
      flightID,
    },
  });

  const flight = response.data?.flight;
  const {
    co2EmissionKgBusiness: business,
    co2EmissionKgEco: eco,
    co2EmissionKgEconomy: economy,
    co2EmissionKgFirst: first,
  } = flight ?? {};

  const firstEmission = useMeasurementDisplay('kg', first);
  const ecoEmission = useMeasurementDisplay('kg', eco);
  const economyEmission = useMeasurementDisplay('kg', economy);
  const businessEmission = useMeasurementDisplay('kg', business);

  if ([eco, economy, business, first].every(isNil)) {
    return null;
  }

  return (
    <Card gap="medium" isLoading={response.loading}>
      <CardTitle>Emission</CardTitle>
      <Content>
        {[
          ['Economy', economyEmission],
          ['Eco+', ecoEmission],
          ['Business Class', businessEmission],
          ['First Class', firstEmission],
        ]
          .filter(([, value]) => !isNil(value))
          .map(([label, value], index) => (
            <React.Fragment key={label}>
              {index > 0 && <HorizontalDivider size="large" />}
              <Item>
                <Label>{label}</Label>
                <Value>{value}</Value>
              </Item>
            </React.Fragment>
          ))}
      </Content>
    </Card>
  );
};

const CardTitle = withStyled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.textSecondary,
  },
]);

const Content = withStyled(View, () => [{}]);

const Item = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.medium,
    justifyContent: 'space-between',
  },
]);

const Label = withStyled(Text, (theme) => [theme.typography.presets.h3]);

const Value = withStyled(Text, (theme) => [theme.typography.presets.h3]);
