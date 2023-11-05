import * as React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';
import { FlightStatus } from '@app/generated/server.gql';

import { DepartStatus } from './depart.status';
import { useFlight } from '../hooks/use.flight';
import { LandingStatus } from './landing.status';

export const SmartStatus: React.FC = () => {
  const flight = useFlight(true);

  if (flight.status === FlightStatus.DEPARTED) {
    return (
      <Container>
        <LandingStatus />
      </Container>
    );
  } else if (flight.status === FlightStatus.SCHEDULED) {
    return (
      <Container>
        <DepartStatus />
      </Container>
    );
  }

  return <></>;
};

const Container = withStyled(Animated.View, () => [], {
  entering: FadeIn,
});
