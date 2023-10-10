import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '.';

import { ROOT_NAVIGATOR_ID } from './_constants';

export function useRootNavigation() {
  const navigation = useNavigation();
  return navigation.getParent<MainStack>(ROOT_NAVIGATOR_ID as any);
}
