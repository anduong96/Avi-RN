import { Text, View } from 'react-native';

import { withStyled } from '@app/lib/styled';

export const Container = withStyled(View, () => ({
  flexDirection: 'row',
}));

export const Label = withStyled(Text, () => ({}));
