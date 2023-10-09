import { Text, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => [
  theme.presets.shadows[100],
  {
    paddingVertical: theme.space.small,
    paddingHorizontal: theme.space.medium,
    gap: theme.space.small,
    backgroundColor: theme.pallette.background,
    borderRadius: theme.borderRadius,
  },
]);

export const Header = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
  },
]);

export const Body = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
    overflow: 'hidden',
  },
]);

export const Footer = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.space.medium,
    paddingTop: theme.space.small,
  },
]);

export const FlightPoint = styled<
  { type: 'origin' | 'destination' },
  typeof View
>(View, (_, props) => [
  props.type === 'destination' && {
    alignItems: 'flex-end',
  },
]);

export const AirportIata = styled(Text, (theme) => [
  theme.typography.presets.h1,
]);

export const AirportCity = styled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.grey[800],
  },
]);

export const DividerContainer = styled(View, (theme) => [
  {
    flexGrow: 1,
    overflow: 'hidden',
    paddingTop: theme.typography.presets.h1.fontSize / 2,
  },
]);

export const AirlineContainer = styled(View, (theme) => [
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.tiny,
  },
]);

export const AirlineFlightNumber = styled(Text, (theme) => [
  {
    color: theme.typography.secondaryColor,
  },
]);

export const Movement = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

export const MovementText = styled(Text, (theme) => [
  theme.typography.presets.h3,
  {
    fontWeight: 'bold',
    color: theme.typography.color,
  },
]);

export const MovementIconContainer = styled(View, () => [{}]);

export const Time = styled(View, () => [
  {
    flexDirection: 'row',
  },
]);

export const TimeText = styled<{ bold?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    {
      color: theme.pallette.grey[500],
    },
    props.bold && {
      fontWeight: 'bold',
    },
  ],
);
