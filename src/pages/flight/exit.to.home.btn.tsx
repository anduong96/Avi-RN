import * as React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';

import { FaIcon } from '@app/components/icons.fontawesome';
import type { FullFlightFragmentFragment } from '@app/generated/server.gql';
import { useUserFlightQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';
import { styled } from '@app/lib/styled';
import type { FlightStackParams } from '@app/stacks/flight.stack';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
        <BlurView blurType="xlight" style={[StyleSheet.absoluteFillObject]} />
        <FaIcon solid name="xmark" size={30} />
      </Btn>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  theme.presets.centered,
  {
    position: 'absolute',
    width: '100%',
    bottom: theme.insets.bottom,
  },
]);

const Btn = styled(
  Animated.createAnimatedComponent(TouchableOpacity),
  (theme) => [
    theme.presets.centered,
    {
      shadowOpacity: 0.8,
      zIndex: 1,
      overflow: 'hidden',
      width: 50,
      borderRadius: 70,
      height: undefined,
      aspectRatio: 1,
    },
  ],
);
