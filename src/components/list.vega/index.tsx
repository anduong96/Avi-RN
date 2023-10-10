import type { FlashListProps } from '@shopify/flash-list';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import * as React from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';

import { FlashList } from '@shopify/flash-list';

import { ListItem } from './item';

const List = Animated.createAnimatedComponent(FlashList);

type Props<T> = Omit<
  FlashListProps<T>,
  | 'data'
  | 'getItemType'
  | 'keyExtractor'
  | 'overrideItemLayout'
  | 'ref'
  | 'renderItem'
> & {
  data?: T[];
  distance?: number;
  keyExtractor?: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactElement;
};

function _VegaList<T = unknown>(
  { data, distance = 0, keyExtractor, renderItem, ...props }: Props<T>,
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
      data={data}
      estimatedItemSize={50}
      keyExtractor={(item, index) =>
        keyExtractor?.(item as T, index) || index.toString()
      }
      onScroll={(event) => {
        props.onScroll?.(event);
        handleScroll(event);
      }}
      renderItem={({ index, item }) => {
        return (
          <ListItem distance={distance} index={index} y={y}>
            {renderItem(item as T, index)}
          </ListItem>
        );
      }}
      scrollEventThrottle={16}
    />
  );
}

export const VegaList = React.forwardRef(_VegaList) as <T>(
  props: Props<T> & { ref?: React.MutableRefObject<FlashList<T> | undefined> },
) => ReturnType<typeof _VegaList>;
