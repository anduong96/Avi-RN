import Animated from 'react-native-reanimated';
import { styled } from '@app/lib/styled';

export const Container = styled<
  { size: number; glow: boolean; color: string },
  typeof Animated.View
>(Animated.View, (theme, props) => [
  theme.presets.centered,
  theme.presets.shadows[100],
  {
    width: props.size,
    borderRadius: props.size,
    height: undefined,
    aspectRatio: 1,
    backgroundColor: props.color,
    shadowColor: props.color,
    shadowOpacity: props.glow ? 0.8 : 0,
  },
]);
