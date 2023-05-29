import { View } from 'react-native';
import { styled } from '@app/lib/styled';

export const Container = styled<{ centered?: boolean }, typeof View>(
  View,
  (theme, props) => [
    props.centered && theme.presets.centered,
    {
      display: 'flex',
      overflow: 'hidden',
      flexGrow: 1,
      backgroundColor: theme.pallette.background,
    },
  ],
);
