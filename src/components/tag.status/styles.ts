import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    columnGap: 5,
  },
]);

export const Label = styled(Text, (theme) => [
  {
    fontSize: 10,
    color: theme.typography.color,
  },
]);

export const Icon = styled(View, (theme) => [theme.presets.centered]);

export const IconText = styled(Text, () => [
  {
    fontWeight: 'bold',
    lineHeight: 0,
    fontSize: 10,
  },
]);
