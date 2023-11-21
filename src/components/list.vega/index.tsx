import type { FlashListProps } from '@shopify/flash-list';

import * as React from 'react';
import { useSharedValue } from 'react-native-reanimated';

import type { FlatListProps } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { ListItem } from './item';

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

export function _VegaList<T = unknown>(
  { data, distance = 0, keyExtractor, renderItem, ...props }: Props<T>,
  ref?: React.RefObject<FlashList<T>>,
) {
  const y = useSharedValue(0);

  const handleScroll: FlatListProps<T>['onScroll'] = (event) => {
    y.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <FlashList
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
