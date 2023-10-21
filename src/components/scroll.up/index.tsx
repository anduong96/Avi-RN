import * as React from 'react';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';

import { IconBtn } from '../icon.btn';

type Props = {
  isAbsolute?: boolean;
  isVisible?: boolean;
  onScrollUp?: () => void;
};

export const ScrollUp: React.FC<Props> = ({
  isAbsolute = false,
  isVisible,
  onScrollUp,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Container
      entering={FadeInDown}
      exiting={FadeOutDown}
      isAbsolute={isAbsolute}
    >
      <Btn icon="arrow-up-to-line" onPress={onScrollUp} size={25} />
    </Container>
  );
};

const Container = withStyled<Pick<Props, 'isAbsolute'>, typeof Animated.View>(
  Animated.View,
  (theme, props) => [
    theme.presets.centered,
    props.isAbsolute && {
      bottom: theme.insets.bottom || theme.space.medium,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    {
      padding: theme.space.medium,
    },
  ],
);

const Btn = withStyled(IconBtn, (theme) => [
  {
    borderColor: theme.pallette.borderColor,
    borderRadius: theme.roundRadius,
    borderWidth: theme.borderWidth,
    padding: theme.space.medium,
  },
]);
