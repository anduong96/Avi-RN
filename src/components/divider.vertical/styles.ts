import { View } from 'react-native';
import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => ({
  width: theme.borderWidth,
  backgroundColor: theme.pallette.borderColor,
  height: '50%',
}));
