import type { LayoutAnimation } from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';
import { withTiming } from 'react-native-reanimated';

export function RotateUpsidedown(): LayoutAnimation {
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
