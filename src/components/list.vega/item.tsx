import type { LayoutChangeEvent } from 'react-native';

import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  children: React.ReactElement;
  distance: number;
  index: number;
  y: Animated.SharedValue<number>;
};

export const ListItem: React.FC<Props> = ({ children, distance, index, y }) => {
  const cardHeight = useSharedValue(0);
  const position = useDerivedValue(
    () => index * cardHeight.value - y.value,
    [index],
  );

  const style = useAnimatedStyle(() => {
    if (!cardHeight.value) {
      return {};
    }

    const opacity = interpolate(position.value, [-cardHeight.value, 0], [0, 1]);

    return {
      opacity,
      transform: [
        {
          scale: interpolate(
            position.value,
            [-cardHeight.value, 0],
            [0.85, 1],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY:
            y.value < 0
              ? 0
              : y.value +
                interpolate(
                  y.value,
                  [0, index * cardHeight.value],
                  [0, -index * cardHeight.value],
                  Extrapolation.CLAMP,
                ),
        },
      ],
    };
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    cardHeight.value = event.nativeEvent.layout.height + distance * 2;
  };

  return (
    <Animated.View
      style={[
        style,
        {
          alignSelf: 'center',
          marginVertical: distance,
          width: '100%',
        },
      ]}
    >
      <View onLayout={handleLayout}>{children}</View>
    </Animated.View>
  );
};
