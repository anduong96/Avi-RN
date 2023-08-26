import * as React from 'react';

import { Text, View } from 'react-native';

import type { FullFlightFragmentFragment } from '@app/generated/server.gql';
import moment from 'moment';
import { styled } from '@app/lib/styled';

type Props = {
  flight: FullFlightFragmentFragment;
};

export const FlightPageTopHeader: React.FC<Props> = ({ flight }) => {
  return (
    <Container>
      <Flight>
        <FlightMeta>
          <FlightNumber>
            {flight.airlineIata} {flight.flightNumber}
          </FlightNumber>
          <DepartureDate>
            {moment(flight.estimatedGateDeparture).format('LL')}
          </DepartureDate>
        </FlightMeta>
      </Flight>
    </Container>
  );
};

const Container = styled(View, () => [
  {
    flexDirection: 'row',
  },
]);

const Flight = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
    justifyContent: 'center',
  },
]);

const FlightMeta = styled(View, () => []);

const FlightNumber = styled(Text, (theme) => [
  theme.typography.presets.h2,
  {
    color: theme.typography.color,
  },
]);

const DepartureDate = styled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.typography.color,
  },
]);
