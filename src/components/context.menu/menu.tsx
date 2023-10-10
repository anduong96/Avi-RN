import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

import * as React from 'react';
import Animated from 'react-native-reanimated';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';

import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import type { OptionItem } from './types';
import type { MenuContextMeta } from './context';

import { StringRenderer } from '../string.renderer';
import { HorizontalDivider } from '../divider.horizontal';

type Props = {
  onClose: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
} & Pick<MenuContextMeta, 'items' | 'title'>;

export const ContextMenu: React.FC<Props> = ({
  items,
  onClose,
  onLayout,
  style,
  title,
}) => {
  const theme = useTheme();

  const handleSelect = async (item: OptionItem) => {
    await item.onPress?.(true);
    onClose();
  };

  return (
    <Container onLayout={onLayout} style={[style]}>
      <FlatList
        ItemSeparatorComponent={() => <HorizontalDivider />}
        ListHeaderComponent={
          <>
            {title && (
              <>
                <Header>
                  <StringRenderer Container={Title}>{title}</StringRenderer>
                </Header>
                <HorizontalDivider />
              </>
            )}
          </>
        }
        data={items}
        keyExtractor={(item, index) => item.label + index}
        renderItem={({ item }) => (
          <Item
            onPress={() => handleSelect(item)}
            style={[item.disabled && { opacity: 0.4 }]}
          >
            <ItemMeta>
              <ItemLabelText
                style={[item.isDanger && { color: theme.pallette.danger }]}
              >
                {item.label}
              </ItemLabelText>
              {item.hint && <ItemHintText>{item.hint}</ItemHintText>}
            </ItemMeta>
            <ItemIcon>
              {item.loading ? <ActivityIndicator size="small" /> : item.icon}
            </ItemIcon>
          </Item>
        )}
        scrollEnabled={false}
      />
    </Container>
  );
};

const Title = styled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.textSecondary,
  },
]);

const Item = styled(Pressable, (theme) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  maxWidth: Dimensions.get('window').width,
  minWidth: 130,
  padding: theme.space.small,
}));

const ItemLabelText = styled(Text, (theme) => ({
  ...theme.typography.presets.p2,
}));

const ItemHintText = styled(Text, (theme) => ({
  ...theme.typography.presets.small,
  color: theme.pallette.textSecondary,
}));

const ItemIcon = styled(View, () => ({}));

const ItemMeta = styled(View, () => ({
  flexGrow: 1,
}));

const Container = styled(Animated.View, (theme) => ({
  backgroundColor: theme.pallette.grey[100],
  borderRadius: theme.borderRadius,
  justifyContent: 'center',
  overflow: 'hidden',
  zIndex: 1,
}));

const Header = styled(View, (theme) => ({
  padding: theme.space.small,
  ...theme.presets.centered,
}));
