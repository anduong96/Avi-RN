import { Dimensions, Pressable, Text, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { styled } from '@app/lib/styled';

export const Container = styled(Animated.View, (theme) => ({
  borderRadius: theme.borderRadius,
  justifyContent: 'center',
  backgroundColor: theme.pallette.grey[100],
  zIndex: 1,
  overflow: 'hidden',
}));

export const Header = styled(View, (theme) => ({
  padding: theme.space.small,
  ...theme.presets.centered,
}));

export const Title = styled(Text, (theme) => ({
  color: theme.typography.secondaryColor,
  ...theme.typography.presets.p2,
}));

export const Item = styled(Pressable, (theme) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  maxWidth: Dimensions.get('window').width,
  minWidth: 130,
  padding: theme.space.small,
}));

export const ItemLabelText = styled(Text, (theme) => ({
  ...theme.typography.presets.p2,
}));

export const ItemHintText = styled(Text, (theme) => ({
  ...theme.typography.presets.small,
  color: theme.typography.secondaryColor,
}));

export const ItemIcon = styled(View, () => ({}));

export const ItemMeta = styled(View, () => ({
  flexGrow: 1,
}));

export const Overlay = styled(Animated.View, (theme) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: theme.pallette.black,
  opacity: 0.2,
  borderRadius: theme.borderRadius,
  width: 100,
  height: 100,
}));
