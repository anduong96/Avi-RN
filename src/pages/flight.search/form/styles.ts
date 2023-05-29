import { Text } from 'react-native';
import { styled } from '@app/lib/styled';

export const DisplayText = styled<
  {
    isFocused?: boolean;
    hasValue?: boolean;
  },
  typeof Text
>(Text, (theme, props) => [
  theme.typography.presets.massive,
  {
    color: theme.pallette.grey[500],
  },
  props.hasValue && {
    color: theme.typography.color,
  },
  props.isFocused && {
    color: theme.pallette.active,
  },
]);
