import * as React from 'react';
import Animated from 'react-native-reanimated';

import type { StyleProp, ViewStyle } from 'react-native';

import { withStyled } from '@app/lib/styled';

type Props = {
  children: React.ReactElement;
  isFocused: boolean;
  style?: StyleProp<ViewStyle>;
};

export const FocusedContainer: React.FC<Props> = ({
  children,
  isFocused,
  style,
}) => {
  return (
    <Container style={[{ flexGrow: isFocused ? 2 : 1 }, style]}>
      {children}
    </Container>
  );
};

const Container = withStyled(Animated.View, () => [
  {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
]);
