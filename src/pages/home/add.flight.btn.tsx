import * as React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import tinycolor from 'tinycolor2';
import LottieView from 'lottie-react-native';

import { styled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { FaIcon } from '@app/components/icons.fontawesome';
import { AnimatedTouchable } from '@app/components/animated.touchable';
import { useRootNavigation } from '@app/navigation/use.root.navigation';

export const AddFlightBtn: React.FC = () => {
  const navigation = useRootNavigation();
  const sparkle = React.useRef<LottieView>(null);
  const leaving = useSharedValue(false);
  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: withTiming(leaving.value ? 1 : 0),
  }));

  const handlePress = () => {
    vibrate('effectClick');
    setTimeout(() => {
      navigation.push('FlightSearch');
    }, 300);
  };

  const handlePressIn = () => {
    leaving.value = true;
    sparkle.current?.play();
    setTimeout(() => {
      leaving.value = false;
      sparkle.current?.pause();
    }, 600);
  };

  return (
    <Btn activeOpacity={1} onPress={handlePress} onPressIn={handlePressIn}>
      <Icon name="plus" size={30} />
      <Sparkle
        loop
        ref={sparkle}
        source={{
          uri: 'https://lottie.host/348d2762-87e6-48a4-bd5d-49aa070a1adf/uW3fTeQdiB.json',
        }}
        speed={2}
        style={[sparkleStyle]}
      />
    </Btn>
  );
};

const Sparkle = styled(Animated.createAnimatedComponent(LottieView), () => [
  {
    bottom: -30,
    left: -30,
    position: 'absolute',
    right: -30,
    top: -30,
  },
]);

const Btn = styled(AnimatedTouchable, (theme) => [
  theme.presets.shadows[100],
  {
    aspectRatio: 1,
    backgroundColor: theme.pallette.primary,
    borderRadius: theme.roundRadius,
    padding: theme.space.medium,
    shadowColor: tinycolor(theme.pallette.primary).darken(30).toHexString(),
    shadowOpacity: 1,
  },
]);

const Icon = styled(FaIcon, (theme) => [
  {
    color: theme.pallette.black,
  },
]);
