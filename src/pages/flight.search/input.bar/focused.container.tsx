import * as React from 'react';
import Animated from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';

type Props = {
  children: React.ReactElement;
  isFocused: boolean;
};

export const FocusedContainer: React.FC<Props> = ({ children, isFocused }) => {
  return (
    <Container style={[{ flexGrow: isFocused ? 2 : 1 }]}>{children}</Container>
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
