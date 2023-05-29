import * as React from 'react';

import Animated, { useSharedValue } from 'react-native-reanimated';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import type { FlashListProps } from '@shopify/flash-list';
import { ListItem } from './item';

const List = Animated.createAnimatedComponent(FlashList);

type Props<T> = Omit<
  FlashListProps<T>,
  | 'data'
  | 'renderItem'
  | 'keyExtractor'
  | 'ref'
  | 'getItemType'
  | 'overrideItemLayout'
> & {
  data?: T[];
  distance?: number;
  renderItem: (item: T, index: number) => React.ReactElement;
  keyExtractor?: (item: T, index: number) => string;
};

function _VegaList<T = unknown>(
  { data, renderItem, distance = 0, keyExtractor, ...props }: Props<T>,
  ref?: any,
) {
  const y = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    y.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <List
      ref={ref}
      showsVerticalScrollIndicator={false}
      {...props}
      keyExtractor={(item, index) =>
        keyExtractor?.(item as T, index) || index.toString()
      }
      estimatedItemSize={50}
      scrollEventThrottle={16}
      data={data}
      onScroll={(event) => {
        props.onScroll?.(event);
        handleScroll(event);
      }}
      renderItem={({ item, index }) => {
        return (
          <ListItem y={y} index={index} distance={distance}>
            {renderItem(item as T, index)}
          </ListItem>
        );
      }}
    />
  );
}

export const VegaList = React.forwardRef(_VegaList) as <T>(
  props: Props<T> & { ref?: React.MutableRefObject<FlashList<T> | undefined> },
) => ReturnType<typeof _VegaList>;
