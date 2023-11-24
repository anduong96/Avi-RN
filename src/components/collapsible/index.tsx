import * as React from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

import type { LayoutChangeEvent } from 'react-native';

import { withStyled } from '@app/lib/styled';

type Props = React.PropsWithChildren<{
  collapsedHeight?: number;
  isCollapsed?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

export const Collapsible: React.FC<Props> = ({
  children,
  collapsedHeight = 0,
  isCollapsed = false,
  style,
}) => {
  const [contentHeight, setContentHeight] = React.useState(0);
  const height = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handleLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;
    setContentHeight(onLayoutHeight);
  };

  React.useEffect(() => {
    if (isCollapsed) {
      height.value = withTiming(collapsedHeight);
      opacity.value = withTiming(0);
    } else {
      height.value = withTiming(contentHeight);
      opacity.value = withTiming(1);
    }
  }, [contentHeight, isCollapsed, collapsedHeight, height, opacity]);

  return (
    <Container style={[{ height, opacity }]}>
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

const Content = withStyled(View, {
  left: 0,
  position: 'absolute',
  right: 0,
});
