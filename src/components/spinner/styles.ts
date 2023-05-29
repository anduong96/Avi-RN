import Animated from 'react-native-reanimated';
import { styled } from '@app/lib/styled';

export const Container = styled(Animated.View, (theme) => ({
  width: '100%',
  ...theme.presets.centered,
}));
