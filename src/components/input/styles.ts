import { TextInput, TouchableOpacity } from 'react-native';

import Animated from 'react-native-reanimated';
import { styled } from '../../lib/styled';

export const Container = styled<
  { type?: 'filled' | 'outlined'; disabled?: boolean },
  typeof Animated.View
>(Animated.View, (theme, props) => [
  theme.presets.outlinedBox,
  {
    paddingHorizontal: theme.space.medium,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.small,
  },
  props.type === 'filled' && {
    backgroundColor: theme.pallette.grey[100],
    borderColor: theme.pallette.grey[100],
  },
  props.disabled && {
    opacity: 0.5,
  },
]);

export const StyledInput = styled(TextInput, (theme) => [
  {
    fontSize: theme.typography.presets.p1.fontSize,
    paddingVertical: theme.space.medium,
    flexGrow: 1,
    height: '100%',
  },
]);

export const ClearContainer = styled(TouchableOpacity, () => ({}));
