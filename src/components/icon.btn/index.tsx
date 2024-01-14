import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import type { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

import tinycolor from 'tinycolor2';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

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
  icon,
  onPress,
  onPressIn,
  size,
  style,
  type = 'solid',
  ...props
}) => {
  const theme = useTheme();
  const color = props.color || theme.pallette.active;

  return (
    <Container
      activeOpacity={activeOpacity}
      color={color}
      onPress={onPress}
      onPressIn={onPressIn}
      size={size}
      style={style}
      type={type}
    >
      <FaIcon color={color} name={icon} size={size} solid {...props} />
    </Container>
  );
};

const Container = withStyled<
  Pick<Props, 'color' | 'size' | 'type'>,
  typeof TouchableOpacity
>(TouchableOpacity, (theme, props) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    borderRadius: theme.roundRadius,
    padding: theme.space.tiny,
  },
  props.disabled && {
    opacity: 0.5,
  },
  props.type === 'solid' && {
    backgroundColor: tinycolor(props.color!).setAlpha(0.2).toRgbString(),
  },
]);
