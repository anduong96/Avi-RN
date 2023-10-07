import { styled } from '@app/lib/styled';
import * as React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  isFocused: boolean;
  children: React.ReactElement;
};

export const FocusedContainer: React.FC<Props> = ({ isFocused, children }) => {
  const isFocusedDerived = useDerivedValue(() => isFocused, [isFocused]);
  const animatedStyle = useAnimatedStyle(() => ({
    flexGrow: withTiming(isFocusedDerived.value ? 1 : 0),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }));

  return <Container style={[animatedStyle]}>{children}</Container>;
};

const Container = styled(Animated.View, () => [
  {
    flexDirection: 'row',
    overflow: 'hidden',
  },
]);
