import { Text, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import { styled } from '@app/lib/styled';

export const Day = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexGrow: 1,
    flexBasis: 1,
    aspectRatio: 1,
  },
]);

export const DayText = styled(Text, () => []);

export const Month = styled(View, (theme) => [
  {
    width: '100%',
    paddingBottom: theme.space.large,
    paddingHorizontal: 4,
  },
]);

export const Weekday = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexGrow: 1,
    flexBasis: 1,
    paddingVertical: theme.space.tiny,
  },
]);

export const WeekdayText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    textAlign: 'center',
    color: theme.pallette.grey[400],
  },
]);

export const YearText = styled(Text, (theme) => [theme.typography.presets.h3]);

export const MonthText = styled(Text, (theme) => [
  theme.typography.presets.h3,
  { fontWeight: 'bold' },
]);

export const MonthHeader = styled(BlurView, (theme) => [
  {
    padding: theme.space.small,
    paddingHorizontal: theme.space.medium,
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

export const Weekdays = styled(View, () => [
  {
    flexDirection: 'row',
  },
]);

export const Header = styled(View, () => [
  {
    width: '100%',
  },
]);

export const Measurer = styled(View, () => [
  {
    width: '100%',
    height: 0,
  },
]);
