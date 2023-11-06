import * as React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';
import { FlightStatus } from '@app/generated/server.gql';

import { useFlight } from '../context';
import { DepartStatus } from './depart.status';
import { LandingStatus } from './landing.status';

export const SmartStatus: React.FC = () => {
  const flight = useFlight();

  if (
    flight.status === FlightStatus.SCHEDULED ||
    flight.status === FlightStatus.DELAYED
  ) {
    return (
      <Container>
        <DepartStatus />
      </Container>
    );
  }

  if (flight.status === FlightStatus.DEPARTED) {
    return (
      <Container>
        <LandingStatus />
      </Container>
    );
  }

  return <></>;
};

const Container = withStyled(
  Animated.View,
  (theme) => [
    {
      marginBottom: theme.space.medium,
    },
  ],
  {
    entering: FadeIn,
  },
);
