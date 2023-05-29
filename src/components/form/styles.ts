import { Text, View } from 'react-native';

import { styled } from '../../lib/styled';

export const FieldContainer = styled(View, (theme) => ({
  marginBottom: theme.space.medium,
}));

export const FieldContent = styled(View, {});
export const FieldMeta = styled(View, {
  paddingVertical: 5,
});
export const ErrorText = styled(Text, (theme) => ({
  color: theme.pallette.danger,
}));

export const HintText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.grey[500],
  },
]);

export const Label = styled(Text, (theme) => ({
  color: theme.typography.color,
}));

export const OptionalText = styled(Text, (theme) => ({
  color: theme.typography.secondaryColor,
  marginLeft: theme.space.tiny,
  fontSize: theme.typography.presets.small.fontSize,
  marginBottom: 1,
  fontWeight: '400',
}));

export const Header = styled(View, (theme) => ({
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginBottom: theme.space.tiny,
}));
