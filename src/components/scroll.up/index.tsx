import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';

import { FaIcon } from '../icons.fontawesome';
import { BlurredBackground } from '../blurred/background';

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
      <Btn onPress={onScrollUp}>
        <BlurredBackground />
        <FaIcon name="arrow-up-to-line" size={25} />
      </Btn>
    </Container>
  );
};

const Container = withStyled<Pick<Props, 'isAbsolute'>, typeof Animated.View>(
  Animated.View,
  (theme, props) => [
    theme.presets.centered,
    props.isAbsolute && {
      alignSelf: 'center',
      bottom: theme.insets.bottom || theme.space.medium,
      position: 'absolute',
    },
    {
      padding: theme.space.medium,
    },
  ],
);

const Btn = withStyled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    borderRadius: theme.roundRadius,
    overflow: 'hidden',
    padding: theme.space.medium,
  },
]);
