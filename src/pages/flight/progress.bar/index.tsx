import type { SharedValue } from 'react-native-reanimated';

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';
import { FaIcon } from '@app/components/icons.fontawesome';
import { DividerDashed } from '@app/components/divider.dashed';
import { BlurredBackground } from '@app/components/blurred.background';

type Props = {
  scrollPositionY: SharedValue<number>;
};

export const ProgressBar: React.FC<Props> = ({}) => {
  return (
    <Container entering={SlideInDown}>
      <Content>
        <BlurredBackground />
        <DividerContainer>
          <DividerDashed dashSize={4} dashThickness={3} />
        </DividerContainer>
        <Item>
          <FaIcon name="plane-departure" />
        </Item>
        <Item>
          <FaIcon name="plane-engines" />
        </Item>
        <Item>
          <FaIcon name="plane-arrival" />
        </Item>
      </Content>
    </Container>
  );
};

const Container = withStyled(Animated.View, (theme) => [
  {
    bottom: 0,
    elevation: 1,
    left: 0,
    paddingBottom: theme.insets.bottom || theme.space.medium,
    paddingHorizontal: theme.space.medium,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
]);

const Item = withStyled(View, () => [{}]);

const Content = withStyled(View, (theme) => [
  {
    borderRadius: theme.roundRadius,
    flexDirection: 'row',
    gap: theme.space.small,
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingHorizontal: theme.space.large,
    paddingVertical: theme.space.medium,
    width: '100%',
  },
]);

const DividerContainer = withStyled(View, (theme) => [
  StyleSheet.absoluteFillObject,
  theme.presets.centered,
  {
    paddingHorizontal: theme.space.large,
  },
]);
