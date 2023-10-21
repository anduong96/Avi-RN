import * as React from 'react';
import { View } from 'react-native';

import { withStyled } from '@app/lib/styled';

import { IconBtn } from '../icon.btn';

type Props = {
  isVisible?: boolean;
  onScrollUp?: () => void;
};

export const ScrollUp: React.FC<Props> = ({ isVisible, onScrollUp }) => {
  return (
    <Container isVisible={isVisible}>
      <Btn icon="arrow-up-to-line" onPress={onScrollUp} size={25} />
    </Container>
  );
};

const Container = withStyled<Pick<Props, 'isVisible'>, typeof View>(
  View,
  (theme, props) => [
    theme.presets.centered,
    {
      bottom: theme.insets.bottom || theme.space.medium,
      left: 0,
      padding: theme.space.medium,
      position: 'absolute',
      right: 0,
    },
    !props.isVisible && {
      opacity: 0,
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
