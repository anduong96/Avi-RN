import * as React from 'react';

import { View } from 'react-native';

import { type FullFlightFragmentFragment } from '@app/generated/server.gql';
import { styled } from '@app/lib/styled';
import { FlightMeta } from './flight.meta';

type Props = {
  flight: FullFlightFragmentFragment;
};

export const FlightPageTopHeader: React.FC<Props> = ({ flight }) => {
  return (
    <Container>
      <Flight>
        <FlightMeta flight={flight} />
      </Flight>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    flexDirection: 'row',
  },
]);

const Flight = styled(View, (theme) => [
  {
    gap: theme.space.tiny,
  },
]);
