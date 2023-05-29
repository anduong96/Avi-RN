import * as React from 'react';

import { ActivityIndicator, FlatList } from 'react-native';
import {
  Container,
  Header,
  Item,
  ItemHintText,
  ItemIcon,
  ItemLabelText,
  ItemMeta,
  Title,
} from './styles';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

import type Animated from 'react-native-reanimated';
import { HorizontalDivider } from '../divider.horizontal';
import type { MenuContextMeta } from './context';
import type { OptionItem } from './types';
import { StringRenderer } from '../string.renderer';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  onLayout: (event: LayoutChangeEvent) => void;
  onClose: () => void;
} & Pick<MenuContextMeta, 'title' | 'items'>;

export const ContextMenu: React.FC<Props> = ({
  style,
  items,
  title,
  onLayout,
  onClose,
}) => {
  const theme = useTheme();

  const handleSelect = async (item: OptionItem) => {
    await item.onPress?.(true);
    onClose();
  };

  return (
    <Container style={[style]} onLayout={onLayout}>
      <FlatList
        data={items}
        scrollEnabled={false}
        keyExtractor={(item, index) => item.label + index}
        ListHeaderComponent={
          <>
            {title && (
              <>
                <Header>
                  <StringRenderer value={title} Container={Title} />
                </Header>
                <HorizontalDivider />
              </>
            )}
          </>
        }
        ItemSeparatorComponent={() => <HorizontalDivider />}
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
      />
    </Container>
  );
};
