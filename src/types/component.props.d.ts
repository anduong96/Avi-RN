import type { StyleProp, ViewStyle } from 'react-native';

export type ComponentProps<T, S = ViewStyle> = T & {
  style?: StyleProp<S>;
};
