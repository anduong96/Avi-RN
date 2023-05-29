import { TouchableOpacity } from 'react-native';
import { styled } from '@app/lib/styled';

export const Container = styled(TouchableOpacity, (theme) => ({
  paddingHorizontal: theme.space.small,
  paddingVertical: theme.space.tiny,
}));
