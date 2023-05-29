import * as React from 'react';

import type { LayoutRectangle } from 'react-native';
import type { OptionItem } from './types';
import type { SharedValue } from 'react-native-reanimated';
import type { StringOrElement } from '@app/types/string.or.component';

export type MenuContextMeta = {
  items: OptionItem[];
  title?: StringOrElement;
  children?: React.ReactNode;
  childrenDim?: SharedValue<LayoutRectangle>;
};

export const MenuContext = React.createContext<MenuContextMeta>({
  items: [],
});
