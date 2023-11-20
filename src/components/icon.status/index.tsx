import * as React from 'react';
import Animated from 'react-native-reanimated';

import type { StyleProp, ViewStyle } from 'react-native';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { FaIcon } from '../icons.fontawesome';

type Props = {
  hasShadow?: boolean;
  size?: number;
  status: 'error' | 'success';
  style?: StyleProp<ViewStyle>;
} & Pick<React.ComponentProps<typeof Animated.View>, 'entering' | 'exiting'>;

export const StatusIcon: React.FC<Props> = ({
  entering,
  exiting,
  hasShadow,
  size,
  status,
  style,
}) => {
  const theme = useTheme();
  const [icon, color] =
    status === 'error'
      ? ['circle-exclamation', theme.pallette.danger]
      : status === 'success'
        ? ['check', theme.pallette.success]
        : '';

  return (
    <Container
      color={color}
      entering={entering}
      exiting={exiting}
      hasShadow={hasShadow}
      size={size}
      style={[style]}
    >
      <FaIcon color={theme.pallette.white} name={icon} size={size} />
    </Container>
  );
};

const Container = withStyled<
  Pick<Props, 'hasShadow' | 'size'> & { color: string },
  typeof Animated.View
>(Animated.View, (theme, props) => [
  theme.presets.centered,
  props.hasShadow && theme.presets.shadows[100],
  props.hasShadow && { shadowColor: props.color },
  {
    backgroundColor: props.color,
    borderRadius: theme.borderRadius,
    height: props.size,
    padding: theme.space.tiny,
    width: props.size,
  },
]);
