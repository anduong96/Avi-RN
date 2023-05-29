import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import { Container } from './styles';

export type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
  align?: 'left' | 'right';
};

export const BackBtn: React.FC<Props> = ({
  onPress,
  style,
  align,
  size = 20,
}) => {
  return (
    <Container
      icon="chevron-left"
      size={size}
      onPress={onPress}
      align={align}
      style={[style]}
    />
  );
};
