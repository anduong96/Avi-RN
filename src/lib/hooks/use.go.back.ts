import { type ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { vibrate } from '../haptic.feedback';

/**
 * The `useGoBack` function is a TypeScript function that takes a navigation object and returns a
 * function that handles going back in the navigation stack.
 * @param {T} navigation - The `navigation` parameter is an object that represents the navigation
 * actions and state for a specific screen or component. It should have the following properties:
 * @returns The function `useGoBack` returns the `handleGoBack` function.
 */
export function useGoBack<
  P extends ParamListBase,
  T extends Pick<
    NativeStackNavigationProp<P>,
    'goBack' | 'canGoBack' | 'popToTop'
  >,
>(navigation: T) {
  const handleGoBack = () => {
    vibrate('impactMedium');

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.popToTop();
    }
  };

  return handleGoBack;
}
