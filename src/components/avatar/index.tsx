import * as React from 'react';
import Animated from 'react-native-reanimated';

import { userState } from '@app/state/user';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { FaIcon } from '../icons.fontawesome';

type Props = {
  hasShadow?: boolean;
  size?: number;
};

export const Avatar: React.FC<Props> = ({ hasShadow, size = 20 }) => {
  const theme = useTheme();
  const colors = userState.useSelect((state) => state.colors);

  return (
    <Container color={colors.pastel} hasShadow={hasShadow}>
      <FaIcon
        color={colors.neon}
        name="user-astronaut"
        size={Math.max(size - theme.space.large, theme.space.large + 10)}
      />
    </Container>
  );
};

const Container = withStyled<
  Pick<Props, 'hasShadow'> & { color: string },
  typeof Animated.View
>(Animated.View, (theme, props) => [
  theme.presets.centered,
  props.hasShadow && theme.presets.shadows[200],
  {
    aspectRatio: 1,
    backgroundColor: props.color,
    borderRadius: theme.roundRadius,
    padding: theme.space.large,
    shadowColor: props.color,
  },
]);
