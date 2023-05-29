import { TouchableOpacity } from 'react-native';
import { styled } from '@app/lib/styled';

export const Container = styled<{ size: number }, typeof TouchableOpacity>(
  TouchableOpacity,
  (theme, props) => [
    theme.presets.centered,
    theme.presets.shadows[100],
    {
      backgroundColor: theme.pallette.grey[200],
      width: props.size,
      borderRadius: props.size,
      height: undefined,
      aspectRatio: 1,
    },
  ],
);
