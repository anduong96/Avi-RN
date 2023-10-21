import * as React from 'react';
import { Text } from 'react-native';

import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';

type Props = {
  flight: Pick<FullFlightFragmentFragment, 'Destination'>;
};

export const FlightTitle: React.FC<Props> = ({ flight }) => {
  const isUS = flight.Destination.countryCode === 'US';

  if (isUS) {
    return <Title>Flight to {flight.Destination.cityName}</Title>;
  }

  return (
    <Title>
      Flight to {flight.Destination.cityName || flight.Destination.name},{' '}
      {flight.Destination.countryCode}
    </Title>
  );
};

const Title = withStyled(Text, (theme) => [
  theme.typography.presets.massive,
  {
    padding: theme.space.medium,
  },
]);
