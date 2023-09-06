import * as React from 'react';

import Animated, { SlideInDown } from 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'react-native';

import type { FlightStackParams } from '@app/stacks/flight.stack';
import type { FullFlightFragmentFragment } from '@app/generated/server.gql';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styled } from '@app/lib/styled';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { useNavigation } from '@react-navigation/native';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightStackParams, 'Flight'>;

type Props = {
  flightID: FullFlightFragmentFragment['id'];
};

export const ExitToHomeBtn: React.FC<Props> = ({ flightID }) => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation<Navigation>();

  useGetFlightQuery({
    variables: {
      flightID,
    },
    onCompleted() {
      setVisible(true);
    },
    onError() {
      setVisible(false);
    },
  });

  const handleExit = () => {
    vibrate('effectClick');
    navigation.popToTop();
  };

  if (!visible) {
    return null;
  }

  return (
    <Container>
      <Btn entering={SlideInDown} onPress={handleExit}>
        <BtnText>To</BtnText>
        <BtnText>Home</BtnText>
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
    theme.presets.shadows[200],
    {
      zIndex: 1,
      backgroundColor: theme.pallette.grey[200],
      width: 70,
      borderRadius: 70,
      height: undefined,
      aspectRatio: 1,
    },
  ],
);

const BtnText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.color,
    fontWeight: 'bold',
  },
]);
