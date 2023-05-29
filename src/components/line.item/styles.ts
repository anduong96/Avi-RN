import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const Value = styled(Text, () => ({}));

export const Label = styled(Text, () => ({}));
