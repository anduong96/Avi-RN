import * as React from 'react';

import { Container } from './styles';
import { FaIcon } from '../icons.fontawesome';
import { vibrate } from '@app/lib/haptic.feedback';

type Props = {
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
};

export const CloseBtn: React.FC<Props> = ({ size = 30, onPress, disabled }) => {
  const handlePress = () => {
    vibrate('impactMedium');
    onPress?.();
  };

  return (
    <Container onPress={handlePress} size={size} disabled={disabled}>
      <FaIcon name="times" />
    </Container>
  );
};
