import type { ViewStyle } from 'react-native';
import type { LayoutAnimation } from 'react-native-reanimated';

import { withTiming } from 'react-native-reanimated';

export function RotateUpsideDown(): LayoutAnimation {
  'worklet';
  const animations: ViewStyle = {
    transform: [
      {
        rotate: withTiming('180deg', { duration: 400 }),
      },
    ],
  };

  return {
    animations,
    initialValues: {
      transform: [
        {
          rotate: '0deg',
        },
      ],
    },
  };
}
