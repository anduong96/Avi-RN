import { Text, TouchableOpacity, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => [
  {
    flexGrow: 1,
    backgroundColor: theme.pallette.black,
  },
]);

export const Content = styled(View, (theme) => [
  {
    gap: theme.space.large,
  },
]);

export const Body = styled(View, (theme) => [
  {
    flexGrow: 1,
    paddingHorizontal: theme.space.medium,
    gap: theme.space.large,
  },
]);

export const Meta = styled(View, () => [
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
]);

export const Header = styled(View, (theme) => [
  {
    backgroundColor: theme.pallette.background,
    paddingHorizontal: theme.space.medium,
    gap: theme.space.medium,
    paddingBottom: theme.space.medium,
  },
]);

export const Title = styled(Text, (theme) => [
  theme.typography.presets.massive,
]);

export const Actions = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.small,
  },
]);

export const ActionButton = styled(TouchableOpacity, (theme) => [
  theme.presets.shadows[100],
  {
    backgroundColor: theme.pallette.grey[100],
    shadowOpacity: 0.1,
    padding: 7,
    borderRadius: theme.borderRadius,
  },
]);

export const SearchContainer = styled(View, () => []);

export const SearchBtn = styled(TouchableOpacity, (theme) => [
  {
    borderRadius: theme.borderRadius,
    backgroundColor: theme.pallette.grey[50],
    padding: 12,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
]);

export const SearchPlaceholderText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.grey[400],
  },
]);

export const ListItem = styled(TouchableOpacity, (theme) => [
  {
    paddingVertical: theme.space.medium / 2,
    paddingHorizontal: theme.space.medium,
  },
]);
