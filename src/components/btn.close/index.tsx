import * as React from 'react';

import RNReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

import { Container } from './styles';
import { MaterialIcon } from '../material.icons';

type Props = {
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
};

export const CloseBtn: React.FC<Props> = ({ size = 30, onPress, disabled }) => {
  const handlePress = () => {
    RNReactNativeHapticFeedback.trigger(HapticFeedbackTypes.impactMedium);
    onPress?.();
  };

  return (
    <Container onPress={handlePress} size={size} disabled={disabled}>
      <MaterialIcon name="close" />
    </Container>
  );
};
