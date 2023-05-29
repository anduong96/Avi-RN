import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import { Container } from './styles';
import { MaterialIcon } from '../material.icons';
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
      <MaterialIcon
        name={icon}
        size={size}
        color={color || theme.pallette.active}
      />
    </Container>
  );
};
