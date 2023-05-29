import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, () => ({}));

export const IconContainer = styled(View, (theme) => ({
  ...theme.presets.centered,
  paddingRight: theme.space.medium,
}));

export const Content = styled(View, () => ({
  flexGrow: 1,
}));

export const TitleText = styled(Text, (theme) => ({
  ...theme.typography.presets.p1,
}));

export const Body = styled<{ shadow?: boolean }, typeof View>(
  View,
  (theme, props) => [
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    props.shadow && [
      theme.presets.shadows[100],
      {
        padding: theme.space.medium,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.pallette.background,
      },
    ],
  ],
);
