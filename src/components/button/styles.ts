import { Text, TouchableOpacity } from 'react-native';

import Animated from 'react-native-reanimated';
import color from 'tinycolor2';
import { styled } from '@app/lib/styled';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Container = styled<
  { fullWidth?: boolean; shadow?: boolean },
  typeof AnimatedTouchable
>(AnimatedTouchable, (theme, props) => [
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: theme.pallette.primary,
    borderRadius: theme.borderRadius,
    paddingVertical: theme.space.small,
    paddingHorizontal: theme.space.medium,
  },
  props.fullWidth && {
    width: '100%',
  },
  props.disabled && {
    backgroundColor: theme.pallette.grey[200],
  },
  !props.disabled && props.shadow && theme.presets.shadows[300],
]);

export const BtnText = styled(Text, (theme) => ({
  fontSize: theme.typography.presets.h3.fontSize,
  color: color
    .mostReadable(theme.pallette.primary, [
      theme.pallette.white,
      theme.pallette.black,
    ])
    .toHexString(),
}));
