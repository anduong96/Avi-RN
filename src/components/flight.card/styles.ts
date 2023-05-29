import { StyleSheet, Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => [
  {
    padding: theme.space.medium,
    gap: theme.space.medium,
  },
]);

export const Item = styled(View, () => [
  {
    flexGrow: 1,
    flexBasis: 1,
  },
]);

export const Body = styled(View, () => [
  {
    flexDirection: 'row',
    alignItems: 'center',
  },
]);

export const Header = styled(View, (theme) => [
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.small,
  },
]);

export const AirlineLogoContainer = styled(View, (theme) => [
  theme.presets.shadows[100],
  {
    backgroundColor: theme.pallette.grey[100],
    padding: theme.space.tiny,
    borderRadius: 30,
  },
]);

export const FlightNumberText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.typography.secondaryColor,
    fontWeight: 'bold',
  },
]);

export const AirlineNameText = styled(Text, (theme) => [
  theme.typography.presets.tiny,
  {
    color: theme.typography.secondaryColor,
  },
]);

export const Airline = styled(View, () => []);

export const Journey = styled(View, () => [
  {
    flexGrow: 1,
  },
]);

export const Divider = styled(View, (theme) => [
  {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 1,
    marginTop: -10,
    borderColor: theme.pallette.grey[600],
  },
]);
