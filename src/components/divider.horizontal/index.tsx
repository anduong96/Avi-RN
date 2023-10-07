import * as React from 'react';

import { View, type StyleProp, type ViewStyle } from 'react-native';

import type { SpaceKeys } from '@app/themes';
import { styled } from '@app/lib/styled';

type Props = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  size?: SpaceKeys;
};

export const HorizontalDivider: React.FC<Props> = ({ style, color, size }) => {
  return (
    <Container style={[style]} size={size}>
      <Line color={color} />
    </Container>
  );
};

const Container = styled<Pick<Props, 'size'>, typeof View>(
  View,
  (theme, props) => [
    {
      paddingHorizontal: theme.space.medium,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    props.size === 'medium' && {
      height: theme.space.medium,
    },
    props.size === 'large' && {
      height: theme.space.large,
    },
  ],
);

const Line = styled<Pick<Props, 'color'>, typeof View>(View, (theme, props) => [
  {
    height: theme.borderWidth,
    backgroundColor: props.color || theme.pallette.borderColor,
  },
]);
