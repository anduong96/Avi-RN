import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled<
  {
    size: number;
    type: 'fill' | 'outlined';
    backgroundColor?: string;
  },
  typeof View
>(View, (theme, props) => [
  theme.presets.centered,
  {
    width: props.size,
    height: undefined,
    aspectRatio: 1,
    borderRadius: props.size,
  },
]);

export const InitialsText = styled(Text, () => ({}));
