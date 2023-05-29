import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.grey[300],
    paddingHorizontal: theme.space.tiny,
    columnGap: 2,
    paddingVertical: 2,
    flexDirection: 'row',
    borderRadius: theme.borderRadius,
  },
]);

export const Label = styled(Text, (theme) => [theme.typography.presets.small]);
