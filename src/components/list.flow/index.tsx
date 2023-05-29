import * as React from 'react';

import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import type { ViewStyle } from 'react-native';
import { WINDOW_WIDTH } from '@app/lib/platform';
import { interpolate } from 'react-native-reanimated';

type Props<T> = {
  data?: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactElement;
  pullToRefresh?: () => void;
};

const List = <T,>(
  { data = [], itemHeight = 120, renderItem, pullToRefresh }: Props<T>,
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
      vertical
      ref={ref}
      scrollAnimationDuration={500}
      loop={false}
      style={{
        justifyContent: 'center',
        flexGrow: 1,
      }}
      customAnimation={animationStyle}
      pullToRefresh={pullToRefresh}
      width={ITEM_WIDTH}
      height={ITEM_HEIGHT}
      data={data}
      renderItem={({ index, item }) => renderItem(item, index)}
    />
  );
};

export const FlowList = React.forwardRef(List) as <T>(
  props: Props<T> & {
    ref?: React.RefObject<ICarouselInstance>;
  },
) => ReturnType<typeof List>;
