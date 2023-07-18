import { Text, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => [
  {
    flexGrow: 1,
    backgroundColor: theme.pallette.grey[100],
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
]);

export const Title = styled(Text, (theme) => [
  theme.typography.presets.massive,
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

export const PageHeader = styled(Animated.View, (theme) => [
  {
    padding: theme.space.medium,
    paddingTop: theme.insets.top || theme.space.medium,
    paddingBottom: 0,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
]);

export const Content = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexGrow: 1,
  },
]);

export const AddBtn = styled(TouchableOpacity, (theme) => [
  theme.presets.shadows[300],
  {
    backgroundColor: theme.pallette.primary,
    padding: theme.space.large,
    borderRadius: theme.borderRadius,
  },
]);

export const UserBtn = styled(TouchableOpacity, (theme) => [
  theme.presets.shadows[100],
  {
    backgroundColor: theme.pallette.grey[100],
    borderRadius: theme.borderRadius,
  },
]);

export const FlightViewTag = styled(View, (theme) => [
  theme.presets.shadows[100],
  {
    backgroundColor: theme.pallette.grey[200],
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius,
  },
]);

export const FlightViewTagText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.color,
  },
]);

export const FlightViewContainer = styled(View, () => []);

export const ListItemActions = styled(View, (theme) => [
  {
    height: '100%',
    padding: theme.space.medium,
  },
]);

export const DeleteItemBtn = styled(TouchableOpacity, (theme) => [
  {
    height: '100%',
    padding: theme.space.medium,
    justifyContent: 'center',
  },
]);

export const DeleteITemBtnText = styled(Text, (theme) => [
  {
    color: theme.pallette.dangerLight,
  },
]);
