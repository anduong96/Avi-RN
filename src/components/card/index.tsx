import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import type { SpaceKeys } from '@app/themes';
import { View } from 'react-native';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = React.PropsWithChildren<{
  direction?: 'row' | 'column';
  padding?: SpaceKeys;
  gap?: SpaceKeys;
  margin?: SpaceKeys;
  style?: StyleProp<ViewStyle>;
  outlined?: boolean;
  hasShadow?: boolean;
  isCentered?: boolean;
}>;

export const Card: React.FC<Props> = ({
  children,
  padding,
  margin,
  gap,
  style,
  outlined,
  hasShadow,
  direction,
  isCentered,
}) => {
  const theme = useTheme();

  const getSize = (key?: SpaceKeys) => {
    return key ? theme.space[key] : 0;
  };

  return (
    <View
      style={[
        direction === 'row' && { flexDirection: 'row' },
        outlined && theme.presets.outlinedBox,
        hasShadow && [theme.presets.shadows[100]],
        isCentered && theme.presets.centered,
        {
          padding: getSize(padding),
          gap: getSize(gap),
          margin: getSize(margin),
          backgroundColor: theme.pallette.white,
          borderRadius: theme.borderRadius,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
