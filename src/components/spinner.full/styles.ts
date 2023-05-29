import { Text, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { styled } from '@app/lib/styled';

const BlurViewAnimated = Animated.createAnimatedComponent(BlurView);

export const Container = styled(BlurViewAnimated, (theme) => ({
  ...theme.presets.centered,
  position: 'absolute',
  flex: 1,
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  zIndex: 1,
}));

export const Title = styled(Text, (theme) => ({
  ...theme.typography.presets.h2,
  textAlign: 'center',
  fontWeight: 'bold',
  lineHeight: 50,
}));

export const Subtitle = styled(Text, (theme) => ({
  ...theme.typography.presets.p2,
  textAlign: 'center',
  color: theme.typography.secondaryColor,
}));

export const Meta = styled(View, (theme) => ({
  ...theme.presets.centered,
  padding: theme.space.medium,
}));
