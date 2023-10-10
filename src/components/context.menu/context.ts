import type { LayoutRectangle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

import * as React from 'react';

import type { StringOrElement } from '@app/types/string.or.component';

import type { OptionItem } from './types';

export type MenuContextMeta = {
  children?: React.ReactNode;
  childrenDim?: SharedValue<LayoutRectangle>;
  items: OptionItem[];
  title?: StringOrElement;
};

export const MenuContext = React.createContext<MenuContextMeta>({
  items: [],
});
