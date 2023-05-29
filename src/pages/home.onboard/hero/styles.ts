import { BlurView } from '@react-native-community/blur';
import { Text } from 'react-native';
import { styled } from '@app/lib/styled';

export const Container = styled(
  BlurView,
  (theme) => [
    theme.presets.centered,
    {
      padding: theme.space.medium,
      borderRadius: theme.borderRadius,
      gap: theme.space.large,
    },
  ],
  {
    blurType: 'light',
  },
);

export const Title = styled(Text, (theme) => [
  theme.typography.presets.massive,
  {
    color: theme.typography.color,
    textAlign: 'center',
  },
]);

export const Subtitle = styled(Text, (theme) => [
  theme.typography.presets.h3,
  {
    color: theme.typography.color,
    textAlign: 'center',
  },
]);
