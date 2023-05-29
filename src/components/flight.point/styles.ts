import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => [
  {
    gap: theme.space.small,
  },
]);

export const AirlineLocation = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.secondaryColor,
  },
]);

export const AirlineIata = styled(Text, (theme) => [
  theme.typography.presets.massive,
  {
    lineHeight: 50,
  },
]);

export const Airline = styled(View, () => []);

export const Footer = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.small,
    alignItems: 'center',
  },
]);

export const DateText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    fontWeight: 'bold',
  },
]);
