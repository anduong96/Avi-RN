import * as React from 'react';

import { Container } from './styles';
import { FadeIn } from 'react-native-reanimated';
import { MaterialIcon } from '../icons.material';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  visible?: boolean;
  size?: number;
  glow?: boolean;
  color?: string;
};

export const CheckIcon: React.FC<Props> = ({
  size = 20,
  glow = true,
  color,
}) => {
  const theme = useTheme();

  return (
    <Container
      size={size}
      entering={FadeIn}
      color={color || theme.pallette.successLight}
      glow={glow}
    >
      <MaterialIcon name="check" color={theme.pallette.white} size={size - 5} />
    </Container>
  );
};
