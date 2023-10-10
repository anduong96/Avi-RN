import * as React from 'react';
import { View } from 'react-native';

import { styled } from '@app/lib/styled';
import { userState } from '@app/state/user';

import { FaIcon } from '../icons.fontawesome';

type Props = {
  hasShadow?: boolean;
  size?: number;
};

export const Avatar: React.FC<Props> = ({ hasShadow, size }) => {
  const colors = userState.useSelect((state) => state.colors);

  return (
    <Container color={colors.neon} hasShadow={hasShadow}>
      <FaIcon color={colors.pastel} name="user-astronaut" size={size} />
    </Container>
  );
};

const Container = styled<
  Pick<Props, 'hasShadow'> & { color: string },
  typeof View
>(View, (theme, props) => [
  theme.presets.centered,
  props.hasShadow && theme.presets.shadows[200],
  {
    aspectRatio: 1,
    backgroundColor: props.color,
    borderRadius: theme.roundRadius,
    padding: theme.space.medium,
    shadowColor: props.color,
    shadowOffset: {
      height: 10,
      width: 10,
    },
  },
]);
