import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import type { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

import { withStyled } from '@app/lib/styled';

import { FaIcon } from '../icons.fontawesome';

type Props = {
  color?: string;
  icon: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  type?: 'bordered' | 'solid';
} & Omit<React.ComponentProps<typeof FaIcon>, 'name'> &
  Pick<TouchableOpacityProps, 'activeOpacity' | 'onPress' | 'onPressIn'>;

export const IconBtn: React.FC<Props> = ({
  activeOpacity,
  color,
  icon,
  onPress,
  onPressIn,
  size,
  style,
  ...props
}) => {
  return (
    <Container
      activeOpacity={activeOpacity}
      onPress={onPress}
      onPressIn={onPressIn}
      style={style}
    >
      <FaIcon color={color} name={icon} size={size} solid {...props} />
    </Container>
  );
};

const Container = withStyled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    borderRadius: theme.roundRadius,
    padding: theme.space.tiny,
  },
]);
