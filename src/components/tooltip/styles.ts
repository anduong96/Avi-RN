import Animated from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { View } from 'react-native';
import { styled } from '@app/lib/styled';

export const Container = styled(
  Animated.createAnimatedComponent(BlurView),
  () => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
);

export const Content = styled(View, (theme) => ({
  backgroundColor: theme.pallette.background,
  borderRadius: theme.borderRadius,
  padding: theme.space.medium,
  ...theme.presets.shadows[200],
  maxWidth: 200,
}));
