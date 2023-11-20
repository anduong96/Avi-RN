import * as React from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { LayoutChangeEvent } from 'react-native';

import { withStyled } from '@app/lib/styled';

type Props = React.PropsWithChildren<{
  isCollapsed?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

export const Collapsible: React.FC<Props> = ({
  children,
  isCollapsed = false,
  style,
}) => {
  const contentHeight = useSharedValue(0);
  const isCollapsedDerived = useDerivedValue(() => isCollapsed, [isCollapsed]);
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(isCollapsedDerived.value ? 0 : contentHeight.value),
    opacity: withTiming(isCollapsedDerived.value ? 0 : 1),
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;
    contentHeight.value = onLayoutHeight;
  };

  return (
    <Container style={[animatedStyle]}>
      <Content onLayout={handleLayout} style={style}>
        {children}
      </Content>
    </Container>
  );
};

const Container = withStyled(Animated.View, {
  overflow: 'hidden',
  position: 'relative',
});

const Content = withStyled(View, { left: 0, position: 'absolute', right: 0 });
