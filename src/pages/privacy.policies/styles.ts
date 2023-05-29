import { ScrollView } from 'react-native';
import { styled } from '@app/lib/styled';

export const Content = styled(ScrollView, (theme) => ({
  padding: theme.space.medium,
  paddingTop: 0,
}));
