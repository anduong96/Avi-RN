import { Text, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled } from '@app/lib/styled';

export const Container = styled(View, (theme) => ({
  gap: theme.space.small,
}));

export const Item = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.small,
    flexDirection: 'row',
  },
]);

export const ItemLabel = styled<{ isActive?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.p1,
    {
      flexGrow: 1,
      color: theme.typography.color,
    },
    props.isActive && {
      color: theme.pallette.active,
    },
  ],
);

export const Section = styled(BlurView, (theme) => ({
  padding: theme.space.medium,
}));

export const SectionLabel = styled(Text, (theme) => ({
  fontWeight: 'bold',
  color: theme.typography.secondaryColor,
  ...theme.typography.presets.h4,
}));

export const Header = styled(View, (theme) => ({
  marginHorizontal: theme.space.medium,
}));

export const ItemAction = styled(View, () => []);

export const ItemActionText = styled(Text, (theme) => [
  {
    fontWeight: 'bold',
    color: theme.pallette.grey[500],
  },
]);
