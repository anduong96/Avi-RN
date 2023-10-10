import type { StyleProp, ViewStyle } from 'react-native';

import * as React from 'react';
import Animated from 'react-native-reanimated';

import { styled } from '@app/lib/styled';
import { useBounceStyle } from '@app/lib/hooks/animations/use.bounce';

import { Logo } from '../logo';

type Props = {
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Spinner: React.FC<Props> = ({ animated = true, style }) => {
  const bounceStyle = useBounceStyle();

  return (
    <Container style={[animated && bounceStyle, style]}>
      <Logo resizeMode="contain" style={{ height: 107, width: 200 }} />
    </Container>
  );
};

const Container = styled(Animated.View, (theme) => ({
  width: '100%',
  ...theme.presets.centered,
}));
