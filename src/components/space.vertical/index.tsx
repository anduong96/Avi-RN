import * as React from 'react';
import { View } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

import type { SpaceKeys } from '@app/themes';

import { useTheme } from '@app/lib/hooks/use.theme';
import { getSpaceValue } from '@app/lib/get.space.value';

type Props = React.PropsWithChildren<{
  size?: SpaceKeys | number;
  style?: StyleProp<ViewStyle>;
}>;

export const SpaceVertical: React.FC<Props> = ({ size = 'medium', style }) => {
  const theme = useTheme();
  return (
    <View
      style={[{ paddingVertical: getSpaceValue(size, theme) / 2 }, style]}
    />
  );
};
