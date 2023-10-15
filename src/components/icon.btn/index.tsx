import type { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { styled } from '@app/lib/styled';

import { FaIcon } from '../icons.fontawesome';

type Props = {
  color?: string;
  icon: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
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

const Container = styled(TouchableOpacity, (theme) => [
  {
    borderRadius: theme.roundRadius,
    padding: theme.space.tiny,
  },
]);
