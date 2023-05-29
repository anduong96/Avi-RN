import * as React from 'react';

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import type { LayoutChangeEvent } from 'react-native';
import { View } from 'react-native';

type Props = {
  y: Animated.SharedValue<number>;
  index: number;
  distance: number;
  children: React.ReactElement;
};

export const ListItem: React.FC<Props> = ({ y, index, distance, children }) => {
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
          width: '100%',
          marginVertical: distance,
          alignSelf: 'center',
        },
      ]}
    >
      <View onLayout={handleLayout}>{children}</View>
    </Animated.View>
  );
};
