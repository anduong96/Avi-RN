import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, () => ({
  flexDirection: 'row',
  alignItems: 'center',
}));

export const Value = styled(Text, (theme) => [
  theme.typography.presets.h4,
  { lineHeight: 30 },
]);

export const IconContainer = styled(View, (theme) => ({
  marginRight: theme.space.small,
}));

export const Meta = styled(View, () => ({}));

export const Hint = styled(Text, () => ({}));

export const Label = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.secondaryColor,
  },
]);
