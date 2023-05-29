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
