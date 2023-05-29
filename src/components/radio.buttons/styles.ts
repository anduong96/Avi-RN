import { Text, TouchableOpacity, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.small,
  },
]);

export const Option = styled<
  { isActive?: boolean; hasErrors?: boolean },
  typeof TouchableOpacity
>(TouchableOpacity, (theme, props) => [
  theme.presets.outlinedBox,
  {
    flexGrow: 1,
    flexBasis: 1,
    padding: theme.space.medium,
    gap: theme.space.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  props.isActive && {
    borderColor: theme.pallette.successLight,
  },
  props.hasErrors && {
    borderColor: theme.pallette.danger,
  },
]);

export const OptionText = styled(Text, (theme) => [
  {
    color: theme.typography.color,
    fontSize: theme.typography.presets.p1.fontSize,
    flexGrow: 1,
  },
]);

export const OptionIndicator = styled<
  { isActive?: boolean; hasErrors?: boolean },
  typeof View
>(View, (theme, props) => [
  theme.presets.centered,
  {
    position: 'absolute',
    right: theme.space.medium,
    width: 20,
    borderRadius: 30,
    borderWidth: 1,
    height: undefined,
    aspectRatio: 1,
  },
  props.isActive && [
    theme.presets.shadows[100],
    {
      borderColor: theme.pallette.successLight,
      backgroundColor: theme.pallette.successLight,
      shadowColor: theme.pallette.successLight,
      shadowOpacity: 0.8,
    },
  ],
  !props.isActive && {
    borderColor: theme.pallette.grey[200],
  },
  props.hasErrors && {
    borderColor: theme.pallette.danger,
  },
]);
