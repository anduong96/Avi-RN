import * as React from 'react';
import { View } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

import { withStyled } from '@app/lib/styled';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const VerticalDivider: React.FC<Props> = ({ style }) => {
  return <Container style={style} />;
};

export const Container = withStyled(View, (theme) => ({
  backgroundColor: theme.pallette.dividerColor,
  height: '50%',
  width: theme.borderWidth,
}));
