import { Text, TouchableOpacity } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(TouchableOpacity, (theme) => ({
  padding: theme.space.small,
  flexDirection: 'row',
}));

export const Label = styled(Text, (theme) => ({
  color: theme.pallette.active,
  ...theme.typography.presets.p1,
}));
