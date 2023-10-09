import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.space.small,
}));

export const Value = styled(Text, (theme) => [theme.typography.presets.h4]);

export const IconContainer = styled(View, () => [{}]);

export const Meta = styled(View, () => ({}));

export const Hint = styled(Text, () => ({}));

export const Label = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.secondaryColor,
  },
]);
