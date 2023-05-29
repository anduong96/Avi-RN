import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import { Container } from './styles';
import { FaIcon } from '../icons.fontawesome';
import { useTheme } from '@app/lib/hooks/use.theme';

export type Props = {
  icon: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
  color?: string;
};

export const IconBtn: React.FC<Props> = ({
  icon,
  onPress,
  style,
  size = 30,
  color,
}) => {
  const theme = useTheme();

  return (
    <Container style={style} onPress={onPress}>
      <FaIcon name={icon} size={size} color={color || theme.pallette.active} />
    </Container>
  );
};
