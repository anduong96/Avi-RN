import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

import { useTheme } from '@app/lib/hooks/use.theme';

export const PrimaryBackground: React.FC = () => {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={[theme.pallette.secondary, theme.pallette.primary]}
      end={{ x: 0.5, y: 1.0 }}
      start={{ x: 0.0, y: 0.25 }}
      style={StyleSheet.absoluteFillObject}
    />
  );
};
