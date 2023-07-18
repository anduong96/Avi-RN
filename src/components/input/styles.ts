import Animated from 'react-native-reanimated';
import type { SpaceKeys } from '@app/themes';
import { TouchableOpacity } from 'react-native';
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

export const ClearContainer = styled(TouchableOpacity, () => ({}));
