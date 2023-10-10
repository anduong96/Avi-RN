import type { LayoutRectangle } from 'react-native';

import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';

import type { StringOrElement } from '@app/types/string.or.component';

import type { OptionItem } from './types';

import { MenuContext } from './context';
import { ContextMenuPortal } from './portal';

type Margins = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

type Props = React.PropsWithChildren<{
  enabled?: boolean;
  items: OptionItem[];
  margins?: (() => Partial<Margins>) | Partial<Margins>;
  onPress?: () => void;
  title?: StringOrElement;
  useLongPress?: boolean;
}>;

export const ContextMenu: React.FC<Props> = ({
  children,
  enabled,
  items,
  margins,
  onPress,
  title,
  useLongPress = true,
}) => {
  const container = React.useRef<View>(null);
  const [showPortal, setShowPortal] = React.useState(false);
  const childrenDim = useSharedValue<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  /**
   * When the user presses the button, the function measures the dimensions of the button and then sets
   * the state of the modal to visible
   */
  const handlePress = () => {
    if (!enabled) {
      return null;
    }

    HapticFeedback.trigger('impactMedium');
    const givenMargins = typeof margins === 'function' ? margins() : margins;
    container.current?.measureInWindow((x, y, width, height) => {
      const dimensions = {
        height,
        width,
        x,
        y,
      };

      const { bottom = 0, left = 0, right = 0, top = 0 } = givenMargins ?? {};
      dimensions.y += top;
      dimensions.y -= bottom;
      dimensions.x += left;
      dimensions.x -= right;

      childrenDim.value = dimensions;
      setShowPortal(true);
    });
  };

  /**
   * If the user is using long press, then call the onPress function. Otherwise, call the handlePress
   * function
   */
  const handleNormalPress = () => {
    if (useLongPress) {
      onPress?.();
    } else {
      handlePress();
    }
  };

  const handleLongPress = () => {
    if (useLongPress) {
      handlePress();
    }
  };

  return (
    <MenuContext.Provider value={{ children, childrenDim, items, title }}>
      <View ref={container}>
        <Pressable
          delayLongPress={500}
          onLongPress={handleLongPress}
          onPress={handleNormalPress}
        >
          {children}
        </Pressable>
        {showPortal && (
          <ContextMenuPortal
            childrenDim={childrenDim}
            onClose={() => setShowPortal(false)}
          />
        )}
      </View>
    </MenuContext.Provider>
  );
};
