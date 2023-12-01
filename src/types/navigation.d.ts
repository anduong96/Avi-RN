import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type NavigationStack<P, K = undefined> = NativeStackNavigationProp<
  P,
  K extends string ? K : keyof P
>;
