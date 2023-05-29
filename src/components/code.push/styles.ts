import { Text, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { styled } from '@app/lib/styled';

export const ProgressBar = styled(View, (theme) => [
  {
    backgroundColor: theme.pallette.grey[200],
    height: 25,
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
    flexDirection: 'row',
  },
]);

export const ProgressBarInner = styled(Animated.View, (theme) => [
  {
    backgroundColor: theme.pallette.active,
  },
]);

export const Progress = styled(View, (theme) => [
  theme.presets.centered,
  {
    width: '100%',
    gap: theme.space.tiny,
  },
]);

export const ProgressText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.secondaryColor,
  },
]);
