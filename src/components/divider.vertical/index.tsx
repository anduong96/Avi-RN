import * as React from 'react';
import { View } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

import { withStyled } from '@app/lib/styled';

type Props = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export const VerticalDivider: React.FC<Props> = ({ size = 1, style }) => {
  return <Container size={size} style={style} />;
};

export const Container = withStyled<Props, typeof View>(
  View,
  (theme, props) => ({
    backgroundColor: theme.pallette.dividerColor,
    height: '50%',
    width: props.size ?? theme.borderWidth,
  }),
);
