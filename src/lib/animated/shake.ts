import type { ViewStyle } from 'react-native';

import {
  type LayoutAnimation,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

/**
 * The Shake function returns a LayoutAnimation object that animates a view by repeatedly translating
 * it horizontally by a given offset for a specified duration.
 * @param {number} [offset=5] - The "offset" parameter determines the maximum distance that the view
 * will shake horizontally. It specifies the number of pixels that the view will move to the left and
 * right during the shaking animation. The default value is 5 pixels.
 * @param {number} [time=100] - The `time` parameter is the duration of each shake animation in
 * milliseconds.
 * @returns The function `Shake` returns an object with two properties: `animations` and
 * `initialValues`.
 */
export function Shake(offset: number = 5, time: number = 100) {
  return (): LayoutAnimation => {
    'worklet';

    const animations: ViewStyle = {
      transform: [
        {
          translateX: withSequence(
            withRepeat(withTiming(offset, { duration: time }), 5, true),
            withTiming(0, { duration: time / 2 }),
          ),
        },
      ],
    };

    const initialValues: ViewStyle = {
      transform: [{ translateX: 0 }],
    };

    return {
      animations,
      initialValues,
    };
  };
}
