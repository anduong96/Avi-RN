import * as React from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';

import type { SpaceKeys } from '@app/themes';

import { styled } from '@app/lib/styled';

type Props = {
  color?: string;
  size?: SpaceKeys;
  style?: StyleProp<ViewStyle>;
};

export const HorizontalDivider: React.FC<Props> = ({ color, size, style }) => {
  return (
    <Container size={size} style={[style]}>
      <Line color={color} />
    </Container>
  );
};

const Container = styled<Pick<Props, 'size'>, typeof View>(
  View,
  (theme, props) => [
    {
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
    backgroundColor: props.color || theme.pallette.borderColor,
    height: theme.borderWidth,
  },
]);
