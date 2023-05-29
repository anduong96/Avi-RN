import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => ({
  zIndex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: theme.pallette.background,
}));

export const Meta = styled(View, (theme) => ({
  flexGrow: 1,
  padding: theme.space.medium,
}));

export const TitleText = styled(Text, (theme) => ({
  ...theme.typography.presets.h2,
  fontWeight: 'bold',
}));

export const SubtitleText = styled(Text, (theme) => ({
  color: theme.pallette.grey[500],
}));

export const Actions = styled(View, (theme) => ({
  padding: theme.space.medium,
}));
