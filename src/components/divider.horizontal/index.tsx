import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import { Container } from './styles';

type Props = {
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const HorizontalDivider: React.FC<Props> = ({ style, color }) => {
  return <Container color={color} style={[style]} />;
};
