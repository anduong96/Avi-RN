import { TextInput, TouchableOpacity } from 'react-native';

import Animated from 'react-native-reanimated';
import type { SpaceKeys } from '@app/themes';
import { styled } from '../../lib/styled';

export const Container = styled<
  { size: SpaceKeys; disabled?: boolean },
  typeof Animated.View
>(Animated.View, (theme, props) => [
  theme.presets.outlinedBox,
  {
    borderRadius: 100,
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.tiny,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space.small,
    backgroundColor: theme.pallette.grey[50],
  },
  props.disabled && {
    opacity: 0.5,
  },
  props.size === 'medium' && {
    paddingVertical: theme.space.small,
  },
  props.size === 'tiny' && {
    paddingVertical: theme.space.tiny,
  },
]);

export const StyledInput = styled<{ size: SpaceKeys }, typeof TextInput>(
  TextInput,
  (theme, props) => [
    {
      fontSize: theme.typography.presets.p1.fontSize,
      flexGrow: 1,
      height: '100%',
    },
    props.size === 'large' && {
      fontSize: theme.typography.presets.h2.fontSize,
    },
  ],
);

export const ClearContainer = styled(TouchableOpacity, () => ({}));
