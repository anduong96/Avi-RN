import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { FlightStackParams } from '@app/navigation/flight.stack';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { FaIcon } from '@app/components/icons.fontawesome';
import { BlurredView } from '@app/components/blurred/view';
import { useUserFlightQuery } from '@app/generated/server.gql';

import { useFlightID } from './context';

type Navigation = NativeStackNavigationProp<FlightStackParams, 'Flight'>;

export const ExitToHomeBtn: React.FC = () => {
  const flightID = useFlightID();
  const navigation = useNavigation<Navigation>();
  const response = useUserFlightQuery({
    variables: {
      flightID,
    },
  });

  const handleExit = () => {
    vibrate('effectClick');
    navigation.popToTop();
  };

  if (!response.data?.userFlight) {
    return null;
  }

  return (
    <Container>
      <Btn entering={SlideInDown} onPress={handleExit}>
        <BlurredView style={[StyleSheet.absoluteFill]} />
        <FaIcon name="arrow-down-to-line" size={30} />
      </Btn>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    bottom: theme.insets.bottom || theme.space.medium,
    left: 0,
    position: 'absolute',
    right: 0,
  },
]);

const Btn = withStyled(
  Animated.createAnimatedComponent(TouchableOpacity),
  (theme) => [
    theme.presets.centered,
    {
      aspectRatio: 1,
      borderRadius: 70,
      height: undefined,
      overflow: 'hidden',
      width: 70,
    },
  ],
);
