import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import * as React from 'react';

import { WINDOW_HEIGHT } from '../platform';

export function useScrollPosition() {
  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsAtBottom(event.nativeEvent.contentOffset.y > WINDOW_HEIGHT * 0.5);
  };

  return {
    handleScroll,
    isAtBottom,
  };
}
