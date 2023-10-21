import * as React from 'react';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';

import { IconBtn } from '../icon.btn';

type Props = {
  isVisible?: boolean;
  onScrollUp?: () => void;
};

export const ScrollUp: React.FC<Props> = ({ isVisible, onScrollUp }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Container entering={FadeInDown} exiting={FadeOutDown}>
      <Btn icon="arrow-up-to-line" onPress={onScrollUp} size={25} />
    </Container>
  );
};

const Container = withStyled(Animated.View, (theme) => [
  theme.presets.centered,
  {
    bottom: theme.insets.bottom || theme.space.medium,
    left: 0,
    padding: theme.space.medium,
    position: 'absolute',
    right: 0,
  },
]);

const Btn = withStyled(IconBtn, (theme) => [
  {
    borderColor: theme.pallette.borderColor,
    borderRadius: theme.roundRadius,
    borderWidth: theme.borderWidth,
    padding: theme.space.medium,
  },
]);
