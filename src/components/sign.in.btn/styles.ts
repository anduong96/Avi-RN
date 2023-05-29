import { Text, TouchableOpacity, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Btn = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  theme.presets.shadows[100],
  {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: theme.pallette.white,
    borderRadius: theme.borderRadius,
    padding: theme.space.medium,
    gap: theme.space.medium,
    borderColor: theme.pallette.black,
    borderWidth: 1,
  },
]);

export const Title = styled(Text, (theme) => ({
  flexGrow: 1,
  fontSize: theme.typography.presets.h3.fontSize,
  fontWeight: '600',
  color: theme.pallette.black,
}));

export const Icon = styled(View, () => ({}));
