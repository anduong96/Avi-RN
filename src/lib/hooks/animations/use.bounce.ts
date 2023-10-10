import * as React from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

/**
 * It returns an animated style that makes the component bounce up and down
 * @param [duration=4000] - The duration of the animation.
 * @param [isLooped=true] - Whether the animation should loop or not.
 * @returns A function that returns an object with a transform property that has a translateY property.
 */
export function useBounceStyle(duration = 4000, isLooped = true) {
  const progress = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    const h = 0;
    const a = 1600 / 2;
    const c = 800 / 2 / a;
    const k = -a * c ** 2;
    const bounce_cycle = 5;
    const damping = 2;

    let y_pos = a * (progress.value - c) ** 2 + k;
    const t0 = Math.sqrt((h - k) / a) + c;
    if (progress.value <= t0) {
      return {
        transform: [{ translateY: y_pos }],
      };
    }
    const vf = 2 * a * (t0 - c);
    const time_intervals = [t0, vf / a / damping + t0];
    for (let i = 0; i < bounce_cycle - 1; i++) {
      time_intervals.push(
        (time_intervals[i + 1] - time_intervals[i]) / damping +
          time_intervals[i + 1],
      );
    }
    let hasInterval = false;
    for (let i = 1; i < bounce_cycle + 1; i++) {
      if (progress.value <= time_intervals[i]) {
        const _k = -a * ((time_intervals[i] - time_intervals[i - 1]) / 2) ** 2;
        y_pos =
          a *
            (progress.value -
              time_intervals[i - 1] -
              (time_intervals[i] - time_intervals[i - 1]) / 2) **
              2 +
          _k +
          h;
        hasInterval = true;
        break;
      }
    }
    if (hasInterval) {
      return {
        transform: [{ translateY: y_pos }],
      };
    }
    return {
      transform: [{ translateY: h }],
    };
  });

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(10, { duration }),
      isLooped ? Infinity : 1,
    );
  }, [duration, isLooped, progress]);

  return rStyle;
}
