import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import { Container } from './styles';
import { Logo } from '../logo';
import { useBounceStyle } from '@app/lib/hooks/animations/use.bounce';

type Props = {
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Spinner: React.FC<Props> = ({ animated = true, style }) => {
  const bounceStyle = useBounceStyle();

  return (
    <Container style={[animated && bounceStyle, style]}>
      <Logo style={{ width: 200, height: 107 }} resizeMode="contain" />
    </Container>
  );
};
