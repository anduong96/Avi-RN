import * as React from 'react';

import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { LayoutChangeEvent, LayoutRectangle, View } from 'react-native';
import { Portal, PortalHost } from '@gorhom/portal';
import { Pressable, StyleSheet } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import { ContextMenu } from './menu';
import { MenuContext } from './context';
import type { SharedValue } from 'react-native-reanimated';
import { useIsDarkMode } from '@app/lib/hooks/use.color.scheme';
import { useTheme } from '@app/lib/hooks/use.theme';

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

type Props = {
  onClose: () => void;
  childrenDim: SharedValue<LayoutRectangle>;
};

const NIL_LAYOUT = {
  x: -1,
  y: -1,
  width: -1,
  height: -1,
};

const HOST_NAME = 'CONTEXT_MENU' as const;
export const ContextMenuPortal: React.FC<Props> & {
  ForModal: typeof ForModal;
} = ({ onClose, childrenDim }) => {
  const container = React.useRef<View>(null);
  const context = React.useContext(MenuContext);
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const scaledDimensions = useSharedValue<LayoutRectangle>({ ...NIL_LAYOUT });
  const menuLayout = useSharedValue<LayoutRectangle>({ ...NIL_LAYOUT });

  const childrenStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: context.childrenDim?.value.x,
    top: context.childrenDim?.value.y,
    width: context.childrenDim?.value.width,
    height: context.childrenDim?.value.height,
    transform: [{ scale: withTiming(1) }, { translateY: 0 }],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    top: 0,
    width: context.childrenDim?.value.width,
    height: context.childrenDim?.value.height,
    opacity: withTiming(0),
  }));

  /* Setting the position of the menu. */
  const menuStyle = useAnimatedStyle(() => {
    const MENU_MARGIN = 10;
    let menuX = -1000;
    let menuY = -1000;

    const isMeasured =
      scaledDimensions.value.height !== -1 && menuLayout.value.height !== -1;

    if (isMeasured) {
      //TODO: obviously need to handle cases where children is at bottom and/or right edge
      menuY = childrenDim.value.y + childrenDim.value.height + MENU_MARGIN;
      menuX = childrenDim.value.x + MENU_MARGIN;
    }

    return {
      top: menuY,
      left: menuX,
      position: 'absolute',
    };
  });

  const handleMenuLayout = (event: LayoutChangeEvent) => {
    menuLayout.value = event.nativeEvent.layout;
  };

  const handleClose = (fromItem?: boolean) => {
    setTimeout(
      () => {
        onClose();
      },
      fromItem ? 500 : 100,
    );
  };

  const collectScaledDimension = () => {
    container.current?.measure((_fx, _fy, width, height, px, py) => {
      scaledDimensions.value = {
        x: px,
        y: py,
        width,
        height,
      };
    });
  };

  return (
    <Portal hostName={HOST_NAME}>
      <Pressable
        style={[StyleSheet.absoluteFill, { zIndex: 1 }]}
        onPress={() => handleClose()}
      >
        <AnimatedBlur
          ref={container}
          onLayout={collectScaledDimension}
          style={[{ flex: 1 }]}
          blurType={isDark ? 'dark' : 'light'}
          blurAmount={7}
          entering={FadeIn.duration(100)}
        />
        <Animated.View style={[childrenStyle]}>
          {context.children}
          <Animated.View
            style={[
              opacityStyle,
              {
                borderRadius: theme.borderRadius,
                backgroundColor: theme.pallette.black,
              },
            ]}
          />
        </Animated.View>
        <ContextMenu
          style={[menuStyle]}
          items={context.items}
          title={context.title}
          onLayout={handleMenuLayout}
          onClose={onClose}
        />
      </Pressable>
    </Portal>
  );
};

const ForModal = () => {
  return <PortalHost name={HOST_NAME} />;
};

ContextMenuPortal.ForModal = ForModal;
