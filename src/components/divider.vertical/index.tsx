import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import { Container } from './styles';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const VerticalDivider: React.FC<Props> = ({ style }) => {
  return <Container style={style} />;
};
