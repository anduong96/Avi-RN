import { Text, View } from 'react-native';

import { Button } from '../button';
import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => [
  theme.presets.centered,
  {
    padding: theme.space.medium,
    gap: theme.space.medium,
    height: '100%',
  },
]);

export const Meta = styled(View, (theme) => ({
  gap: theme.space.small,
}));

export const Actions = styled(View, (theme) => [
  theme.presets.centered,
  {
    marginTop: theme.space.large,
    gap: theme.space.medium,
  },
]);

export const TitleText = styled(Text, (theme) => [
  theme.typography.presets.h1,
  {
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
]);

export const SubtitleText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.typography.secondaryColor,
    textAlign: 'center',
  },
]);

export const ActionItem = styled(Button, () => ({}));

export const Hero = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexGrow: 1,
    flexBasis: 1,
    padding: theme.space.medium,
  },
]);

export const Content = styled(View, () => [
  {
    flexGrow: 1,
    flexBasis: 1,
  },
]);
