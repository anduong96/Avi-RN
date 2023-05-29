import { Image } from 'react-native';
import { styled } from '@app/lib/styled';

export const StyledImage = styled<
  { size?: number; type?: 'dark' | 'light' },
  typeof Image
>(Image, (_theme, props) => [
  props.type === 'light' && {
    tintColor: '#fff',
  },
  Boolean(props.size) && {
    width: props.size,
    height: undefined,
    aspectRatio: 1,
  },
]);
