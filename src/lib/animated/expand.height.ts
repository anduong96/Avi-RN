import type { ViewStyle } from 'react-native';
import type { LayoutAnimation } from 'react-native-reanimated';

import { withTiming } from 'react-native-reanimated';

export function ExpandHeight(height: number) {
  return (): LayoutAnimation => {
    'worklet';

    const animations: ViewStyle = {
      height: withTiming(height),
    };

    return {
      animations,
      initialValues: {
        height: 0,
      },
    };
  };
}
