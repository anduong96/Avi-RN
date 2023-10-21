import RNReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

/**
 * This TypeScript function triggers haptic feedback based on the specified type.
 * @param type - The type parameter is a string that represents the type of haptic feedback to trigger.
 * It is a keyof typeof HapticFeedbackTypes, which means it must be one of the keys of the
 * HapticFeedbackTypes object. The HapticFeedbackTypes object maps these keys to the corresponding
 * haptic feedback constants
 */
export function vibrate(type: keyof typeof HapticFeedbackTypes) {
  RNReactNativeHapticFeedback.trigger(HapticFeedbackTypes[type]);
}

/**
 * The `vibrateFn` function triggers a haptic feedback of a specified type and then executes a callback
 * function.
 * @param type - The `type` parameter is a string that represents the type of haptic feedback to be
 * triggered. It should be one of the keys of the `HapticFeedbackTypes` object.
 * @param fn - The `fn` parameter is a callback function that will be executed after the `vibrate`
 * function is called.
 */
export function vibrateFn(
  type: keyof typeof HapticFeedbackTypes,
  fn: () => void,
) {
  vibrate(type);
  fn();
}
