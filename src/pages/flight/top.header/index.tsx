import * as React from 'react';
import { View } from 'react-native';

import { styled } from '@app/lib/styled';
import { type FullFlightFragmentFragment } from '@app/generated/server.gql';

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
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: theme.space.medium,
  },
]);

const Flight = styled(View, (theme) => [
  {
    gap: theme.space.tiny,
  },
]);
