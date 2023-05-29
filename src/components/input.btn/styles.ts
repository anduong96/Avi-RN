import { Text, TouchableOpacity, View } from 'react-native';

import type { SpaceKeys } from '@app/themes';
import { styled } from '@app/lib/styled';

export const Container = styled<
  {
    isFullWidth?: boolean;
    hasError?: boolean;
    isDisabled?: boolean;
  },
  typeof View
>(View, (theme, props) => [
  theme.presets.input,
  {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 55,
  },
  props.isFullWidth && {
    width: '100%',
  },
  props.hasError && {
    borderColor: theme.pallette.danger,
  },
  props.isDisabled && {
    opacity: 0.5,
  },
]);

export const Btn = styled<{ size?: SpaceKeys }, typeof TouchableOpacity>(
  TouchableOpacity,
  (theme, props) => [
    {
      borderWidth: 0,
      flexGrow: 1,
      padding: theme.space.medium,
    },
    props.size === 'large' && {
      paddingVertical: theme.space.large,
    },
  ],
);

export const PlaceholderText = styled(Text, (theme) => ({
  color: theme.pallette.grey[400],
}));

export const ValueText = styled(Text, (theme) => ({
  fontSize: theme.typography.presets.p1.fontSize,
}));

export const AddonLeft = styled(View, (theme) => ({
  paddingLeft: theme.space.medium,
}));

export const AddonRight = styled(View, (theme) => ({
  paddingRight: theme.space.medium,
}));
