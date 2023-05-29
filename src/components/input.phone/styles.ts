import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled<
  { hasErrors?: boolean; disabled?: boolean },
  typeof View
>(View, (theme, props) => [
  theme.presets.outlinedBox,
  theme.presets.centered,
  props.hasErrors && {
    borderColor: theme.pallette.dangerLight,
  },
  props.disabled && {
    backgroundColor: theme.pallette.grey[100],
  },
  {
    flexDirection: 'row',
  },
]);

export const Country = styled(TouchableOpacity, (theme) => [
  {
    padding: theme.space.medium,
    paddingRight: theme.space.small,
  },
]);

export const CountryCode = styled(Text, () => []);

export const StyledInput = styled(TextInput, (theme) => [
  {
    padding: theme.space.medium,
    paddingLeft: theme.space.small,
    flexGrow: 1,
  },
]);
