import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

import type { FlightStackParams } from '@app/navigation/flight.stack';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useUserFlightQuery } from '@app/generated/server.gql';
import { useIsDarkMode } from '@app/lib/hooks/use.color.scheme';

import { useFlightID } from './context';

type Navigation = NativeStackNavigationProp<FlightStackParams, 'Flight'>;

type Props = {
  isVisible?: boolean;
};

export const ExitToHomeBtn: React.FC<Props> = ({ isVisible }) => {
  const flightID = useFlightID();
  const isDark = useIsDarkMode();
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

  if (!response.data?.userFlight || !isVisible) {
    return null;
  }

  return (
    <Container>
      <Btn entering={SlideInDown} onPress={handleExit}>
        <BlurView
          blurType={isDark ? 'light' : 'dark'}
          style={[StyleSheet.absoluteFillObject]}
        />
        <FaIcon name="arrow-down-to-line" size={30} />
      </Btn>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    bottom: theme.insets.bottom,
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
