import type { ViewStyle } from 'react-native';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';

import * as React from 'react';
import { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { WINDOW_WIDTH } from '@app/lib/platform';

type Props<T> = {
  data?: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactElement;
};

const List = <T,>(
  { data = [], itemHeight = 120, renderItem }: Props<T>,
  ref: React.ForwardedRef<ICarouselInstance>,
) => {
  const ITEM_WIDTH = WINDOW_WIDTH;
  const ITEM_HEIGHT = itemHeight;

  const animationStyle = React.useCallback(
    (value: number): ViewStyle => {
      'worklet';
      const scale = interpolate(
        value,
        [-2, -1, 0, 1, 2],
        [0.8, 0.95, 1, 0.95, 0.8],
      );
      const opacity = interpolate(
        value,
        [-2, -1, 0, 1, 2],
        [0.2, 0.4, 1, 0.4, 0.2],
      );
      const translateY = interpolate(
        value,
        [-1, 0, 1],
        [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
      );

      return {
        opacity,
        transform: [{ translateY }, { scale }],
      };
    },
    [ITEM_HEIGHT],
  );

  return (
    <Carousel
      customAnimation={animationStyle}
      data={data}
      height={ITEM_HEIGHT}
      loop={false}
      ref={ref}
      renderItem={({ index, item }) => renderItem(item, index)}
      scrollAnimationDuration={500}
      style={{
        flexGrow: 1,
        justifyContent: 'center',
      }}
      vertical
      width={ITEM_WIDTH}
    />
  );
};

export const FlowList = React.forwardRef(List) as <T>(
  props: Props<T> & {
    ref?: React.RefObject<ICarouselInstance>;
  },
) => ReturnType<typeof List>;
