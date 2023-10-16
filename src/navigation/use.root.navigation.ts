import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '.';

import { ROOT_NAVIGATOR_ID } from './_constants';

export function useRootNavigation() {
  type Navigation = NativeStackNavigationProp<ParamListBase, string, string>;
  const navigation = useNavigation<Navigation>();
  return navigation.getParent<MainStack>(ROOT_NAVIGATOR_ID);
}
