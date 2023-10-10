import type { StyleProp, ViewStyle } from 'react-native';

import * as React from 'react';
import { View } from 'react-native';

import { styled } from '@app/lib/styled';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const VerticalDivider: React.FC<Props> = ({ style }) => {
  return <Container style={style} />;
};

export const Container = styled(View, (theme) => ({
  backgroundColor: theme.pallette.borderColor,
  height: '50%',
  width: theme.borderWidth,
}));
