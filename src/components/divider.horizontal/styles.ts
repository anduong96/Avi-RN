import { View } from 'react-native';
import { styled } from '@app/lib/styled';

export const Container = styled<{ color?: string }, typeof View>(
  View,
  (theme, props) => ({
    height: theme.borderWidth,
    backgroundColor: props.color || theme.pallette.borderColor,
  }),
);
