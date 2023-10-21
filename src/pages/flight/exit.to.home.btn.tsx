import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

import type { FlightStackParams } from '@app/navigation/flight.stack';
import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useUserFlightQuery } from '@app/generated/server.gql';

type Navigation = NativeStackNavigationProp<FlightStackParams, 'Flight'>;

type Props = {
  flightID: FullFlightFragmentFragment['id'];
};

export const ExitToHomeBtn: React.FC<Props> = ({ flightID }) => {
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
        <BlurView blurType="dark" style={[StyleSheet.absoluteFillObject]} />
        <FaIcon name="xmark" size={30} solid />
      </Btn>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    bottom: theme.insets.bottom,
    position: 'absolute',
    width: '100%',
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
      shadowOpacity: 0.8,
      width: 50,
      zIndex: 1,
    },
  ],
);
