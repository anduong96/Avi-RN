import * as React from 'react';
import { View } from 'react-native';

import { withStyled } from '@app/lib/styled';
import { type FullFlightFragmentFragment } from '@app/generated/server.gql';

import { FlightMeta } from './flight.meta';

type Props = {
  flight: FullFlightFragmentFragment;
};

export const FlightPageTopHeader: React.FC<Props> = ({ flight }) => {
  return (
    <Container>
      <FlightMeta flight={flight} />
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: theme.space.medium,
  },
]);
