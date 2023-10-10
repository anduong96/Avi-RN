import type { SharedValue } from 'react-native-reanimated';
import type { LayoutChangeEvent, LayoutRectangle, View } from 'react-native';

import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Portal, PortalHost } from '@gorhom/portal';
import { BlurView } from '@react-native-community/blur';

import { useTheme } from '@app/lib/hooks/use.theme';
import { useIsDarkMode } from '@app/lib/hooks/use.color.scheme';

import { ContextMenu } from './menu';
import { MenuContext } from './context';

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

type Props = {
  childrenDim: SharedValue<LayoutRectangle>;
  onClose: () => void;
};

const NIL_LAYOUT = {
  height: -1,
  width: -1,
  x: -1,
  y: -1,
};

const HOST_NAME = 'CONTEXT_MENU' as const;
export const ContextMenuPortal: React.FC<Props> & {
  ForModal: typeof ForModal;
} = ({ childrenDim, onClose }) => {
  const container = React.useRef<View>(null);
  const context = React.useContext(MenuContext);
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const scaledDimensions = useSharedValue<LayoutRectangle>({ ...NIL_LAYOUT });
  const menuLayout = useSharedValue<LayoutRectangle>({ ...NIL_LAYOUT });

  const childrenStyle = useAnimatedStyle(() => ({
    height: context.childrenDim?.value.height,
    left: context.childrenDim?.value.x,
    position: 'absolute',
    top: context.childrenDim?.value.y,
    transform: [{ scale: withTiming(1) }, { translateY: 0 }],
    width: context.childrenDim?.value.width,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    height: context.childrenDim?.value.height,
    left: 0,
    opacity: withTiming(0),
    position: 'absolute',
    top: 0,
    width: context.childrenDim?.value.width,
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
      left: menuX,
      position: 'absolute',
      top: menuY,
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
        height,
        width,
        x: px,
        y: py,
      };
    });
  };

  return (
    <Portal hostName={HOST_NAME}>
      <Pressable
        onPress={() => handleClose()}
        style={[StyleSheet.absoluteFill, { zIndex: 1 }]}
      >
        <AnimatedBlur
          blurAmount={7}
          blurType={isDark ? 'dark' : 'light'}
          entering={FadeIn.duration(100)}
          onLayout={collectScaledDimension}
          ref={container}
          style={[{ flex: 1 }]}
        />
        <Animated.View style={[childrenStyle]}>
          {context.children}
          <Animated.View
            style={[
              opacityStyle,
              {
                backgroundColor: theme.pallette.black,
                borderRadius: theme.borderRadius,
              },
            ]}
          />
        </Animated.View>
        <ContextMenu
          items={context.items}
          onClose={onClose}
          onLayout={handleMenuLayout}
          style={[menuStyle]}
          title={context.title}
        />
      </Pressable>
    </Portal>
  );
};

const ForModal = () => {
  return <PortalHost name={HOST_NAME} />;
};

ContextMenuPortal.ForModal = ForModal;
