import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled<{ withTopInset?: boolean }, typeof View>(
  View,
  (theme, props) => [
    {
      zIndex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.pallette.background,
      paddingTop: props.withTopInset ? theme.insets.top : theme.space.medium,
    },
  ],
);

export const Meta = styled(View, (theme) => ({
  flexGrow: 1,
  padding: theme.space.medium,
  paddingTop: 0,
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
  paddingTop: 0,
}));
