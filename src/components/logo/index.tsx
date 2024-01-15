import * as React from 'react';
import { Image, View } from 'react-native';

import { useIsDarkTheme } from '@app/lib/hooks/use.theme';

type Props = {
  isDark?: boolean;
  size?: number;
};

export const Logo: React.FC<Props> = ({ isDark, size }) => {
  const isDarkTheme = useIsDarkTheme();
  const isActuallyDark = isDark ?? isDarkTheme;
  const logo = isActuallyDark
    ? require('@app/assets/logo_white.png')
    : require('@app/assets/logo_black.png');

  return (
    <View style={{ aspectRatio: 1, width: size }}>
      <Image
        resizeMethod="auto"
        resizeMode="contain"
        source={logo}
        style={{ height: '100%', width: '100%' }}
      />
    </View>
  );
};
