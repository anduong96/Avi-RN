import * as React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { styled } from '@app/lib/styled';

type Props = {
  children: React.ReactElement;
  isFocused: boolean;
};

export const FocusedContainer: React.FC<Props> = ({ children, isFocused }) => {
  const isFocusedDerived = useDerivedValue(() => isFocused, [isFocused]);
  const animatedStyle = useAnimatedStyle(() => ({
    flexDirection: 'row',
    flexGrow: isFocusedDerived.value ? 1 : 0,
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
