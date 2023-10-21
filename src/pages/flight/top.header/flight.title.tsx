import * as React from 'react';
import { Text } from 'react-native';

import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';

type Props = {
  flight: Pick<FullFlightFragmentFragment, 'Destination'>;
};

export const FlightTitle: React.FC<Props> = ({ flight }) => {
  return (
    <Title>
      Flight to {flight.Destination.cityName || flight.Destination.countryCode}
    </Title>
  );
};

const Title = withStyled(Text, (theme) => [theme.typography.presets.massive]);
