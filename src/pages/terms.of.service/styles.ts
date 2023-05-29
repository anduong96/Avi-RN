import { ScrollView, Text } from 'react-native';

import { styled } from '@app/lib/styled';

export const Content = styled(ScrollView, (theme) => ({
  padding: theme.space.medium,
  paddingTop: 0,
}));

export const PublishedDateText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.secondaryColor,
  },
]);
