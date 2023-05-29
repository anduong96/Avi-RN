import { Text, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { styled } from '@app/lib/styled';

export const Btn = styled<
  { position: 'bottomLeft' | 'bottomRight' },
  typeof TouchableOpacity
>(TouchableOpacity, (theme, props) => [
  theme.presets.centered,
  theme.presets.shadows[100],
  {
    position: 'absolute',
    zIndex: 1,
    width: 60,
    borderRadius: 60,
    aspectRatio: 1,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  props.position === 'bottomLeft' && {
    bottom: theme.insets.bottom,
    left: theme.insets.left + theme.space.medium,
  },
  props.position === 'bottomRight' && {
    bottom: theme.insets.bottom,
    right: theme.insets.right + theme.space.medium,
  },
]);

export const ModalBg = styled(View, (theme) => [
  {
    backgroundColor: theme.pallette.black,
    opacity: 0.4,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
]);

export const Options = styled(
  Animated.createAnimatedComponent(BlurView),
  (theme) => [
    {
      position: 'absolute',
      bottom: theme.insets.bottom + theme.space.medium + 60,
      right: theme.space.medium,
      borderRadius: theme.borderRadius,
    },
  ],
);

export const OptionItem = styled(TouchableOpacity, (theme) => [
  {
    padding: theme.space.medium,
  },
]);

export const OptionItemText = styled<{ disabled?: boolean }, typeof Text>(
  Text,
  (theme) => [
    theme.typography.presets.p1,
    {
      color: theme.typography.color,
      textAlign: 'left',
    },
  ],
);
