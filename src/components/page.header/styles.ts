import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => ({
  paddingTop: theme.insets.top || theme.space.medium,
  paddingBottom: theme.space.medium,
  flexDirection: 'row',
  alignItems: 'center',
}));

export const Content = styled<{ align?: 'center' | 'left' }, typeof View>(
  View,
  (theme, props) => [
    {
      flexGrow: 1,
      paddingHorizontal: theme.space.medium,
    },
    props.align === 'center' && {
      alignItems: 'center',
      position: 'absolute',
      top: theme.space.medium,
      left: 0,
      right: 0,
    },
  ],
);

export const Title = styled(Text, (theme) => ({
  ...theme.typography.presets.h2,
  fontWeight: 'bold',
}));

export const Subtitle = styled(Text, (theme) => ({
  ...theme.typography.presets.p2,
  color: theme.typography.secondaryColor,
}));

export const RightActions = styled(View, () => ({}));

export const LeftActions = styled(View, () => ({}));
