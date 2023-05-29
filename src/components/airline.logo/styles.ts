import { Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { styled } from '@app/lib/styled';

export const Container = styled(View, () => ({
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'row',
  overflow: 'hidden',
}));

export const Logo = styled(FastImage, () => ({
  width: '100%',
  height: '100%',
}));

export const Name = styled(Text, (theme) => ({
  fontSize: theme.typography.presets.small.fontSize,
}));
