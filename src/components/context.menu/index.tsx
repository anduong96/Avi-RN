import * as React from 'react';

import { Pressable, View } from 'react-native';

import { ContextMenuPortal } from './portal';
import HapticFeedback from 'react-native-haptic-feedback';
import type { LayoutRectangle } from 'react-native';
import { MenuContext } from './context';
import type { OptionItem } from './types';
import type { StringOrElement } from '@app/types/string.or.component';
import { useSharedValue } from 'react-native-reanimated';

type Margins = {
  left: number;
  right: number;
  bottom: number;
  top: number;
};

type Props = React.PropsWithChildren<{
  title?: StringOrElement;
  items: OptionItem[];
  enabled?: boolean;
  margins?: Partial<Margins> | (() => Partial<Margins>);
  onPress?: () => void;
  useLongPress?: boolean;
}>;

export const ContextMenu: React.FC<Props> = ({
  title,
  items,
  children,
  margins,
  onPress,
  enabled,
  useLongPress = true,
}) => {
  const container = React.useRef<View>(null);
  const [showPortal, setShowPortal] = React.useState(false);
  const childrenDim = useSharedValue<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
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
        x,
        y,
        width,
        height,
      };

      const { top = 0, bottom = 0, left = 0, right = 0 } = givenMargins ?? {};
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
    <MenuContext.Provider value={{ items, title, children, childrenDim }}>
      <View ref={container}>
        <Pressable
          onPress={handleNormalPress}
          onLongPress={handleLongPress}
          delayLongPress={500}
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
