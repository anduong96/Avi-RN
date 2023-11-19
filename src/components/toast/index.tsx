import type { BlurViewProps } from '@react-native-community/blur';
import type { PanGestureHandlerProps } from 'react-native-gesture-handler';

import * as React from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  BounceIn,
  FadeInUp,
  interpolate,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  ActivityIndicator,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import moment from 'moment';
import { isNil } from 'lodash';
import tinycolor from 'tinycolor2';
import { BlurView } from '@react-native-community/blur';

import type { StringOrElement } from '@app/types/string.or.component';

import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { useTimeout } from '@app/lib/hooks/use.timeout';
import { IS_ANDROID, IS_IOS, WINDOW_WIDTH } from '@app/lib/platform';

import { Typography } from '../typography';
import { FaIcon } from '../icons.fontawesome';
import { StringRenderer } from '../string.renderer';

type Props = {
  description?: StringOrElement;
  descriptionStyle?: StyleProp<TextStyle>;
  dismissType?: 'auto' | 'swipe' | 'touch';
  durationMs?: number;
  icon?: React.ReactElement;
  onFinish?: () => void;
  preset?: 'error' | 'info' | 'loading' | 'success' | 'warning';
  sound?: boolean;
  style?: StyleProp<ViewStyle>;
  title: StringOrElement;
  titleStyle?: StyleProp<TextStyle>;
};

export const Toast: React.FC<Props> = ({
  description,
  descriptionStyle,
  dismissType = 'touch',
  durationMs = moment.duration({ seconds: 3 }).as('ms'),
  icon,
  onFinish,
  preset = 'info',
  title,
  titleStyle,
}) => {
  const theme = useTheme();
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const isHidden = React.useRef(false);
  const [iconName, iconColor] =
    preset === 'success'
      ? ['check', theme.pallette.success]
      : preset === 'warning'
        ? ['triangle-exclamation', theme.pallette.warn]
        : preset === 'error'
          ? ['brake-warning', theme.pallette.danger]
          : preset === 'info'
            ? [undefined, theme.pallette.active]
            : [undefined, undefined];

  const handleHide = () => {
    if (isHidden.current) {
      return;
    }

    isHidden.current = true;
    translateY.value = withTiming(-100, { duration: 400 });
    opacity.value = withTiming(0, { duration: 200 });

    setTimeout(() => {
      logger.debug('Toast dismissed');
      onFinish?.();
    }, 500);
  };

  const handleTap = () => {
    if (dismissType === 'touch' || dismissType === 'auto') {
      handleHide();
    }
  };

  const handleGestureEvent: PanGestureHandlerProps['onGestureEvent'] = (
    event,
  ) => {
    if (dismissType !== 'swipe') {
      return;
    }

    translateY.value = event.nativeEvent.translationY;
    opacity.value = interpolate(
      event.nativeEvent.translationY,
      [-50, 0],
      [0, 1],
    );

    if (event.nativeEvent.translationY < -30) {
      handleHide();
    }
  };

  const handleGestureStateChange: PanGestureHandlerProps['onHandlerStateChange'] =
    (event) => {
      if (dismissType !== 'swipe') {
        return;
      }

      if (event.nativeEvent.state === State.END) {
        if (event.nativeEvent.translationY < -30) {
          handleHide();
        } else {
          translateY.value = withTiming(0, { duration: 400 });
          opacity.value = withTiming(1, { duration: 200 });
        }
      }
    };

  const getIcon = () => {
    if (!isNil(icon)) {
      return icon;
    }

    if (!isNil(iconName) && !isNil(iconColor)) {
      return <FaIcon color={iconColor} name={iconName} solid />;
    }

    if (preset === 'loading') {
      return <ActivityIndicator size="small" />;
    }

    return null;
  };

  useTimeout(() => {
    if (dismissType === 'auto') {
      handleHide();
    }
  }, durationMs);

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleGestureStateChange}
    >
      <Container
        entering={FadeInUp}
        style={[
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Background preset={preset} />
        <IconContainer>{getIcon()}</IconContainer>
        <Content onTouchStart={handleTap}>
          <StringRenderer
            Container={Typography}
            isBold
            numberOfLines={1}
            style={titleStyle}
            type="p1"
          >
            {title}
          </StringRenderer>
          {!isNil(description) && (
            <StringRenderer
              Container={Typography}
              numberOfLines={2}
              style={descriptionStyle}
              type="p2"
            >
              {description}
            </StringRenderer>
          )}
        </Content>
      </Container>
    </PanGestureHandler>
  );
};

const Container = withStyled(Animated.View, (theme) => [
  {
    alignSelf: 'center',
    borderRadius: theme.roundRadius,
    flexDirection: 'row',
    maxWidth: 500,
    overflow: 'hidden',
    position: 'absolute',
    top: theme.insets.top + theme.space.medium,
    width: WINDOW_WIDTH - theme.space.medium * 2,
  },
]);

const Content = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexGrow: 1,
    paddingHorizontal: theme.space.large + theme.space.medium,
    paddingVertical: theme.space.small,
  },
  IS_IOS && {
    gap: 3,
  },
]);

const IconContainer = withStyled(
  Animated.View,
  (theme) => [
    theme.presets.centered,
    {
      alignSelf: 'center',
      left: 0,
      paddingHorizontal: theme.space.large,
      position: 'absolute',
    },
  ],
  {
    entering: BounceIn.delay(300),
  },
);

const Background = withStyled<Pick<Props, 'preset'>, typeof BlurView>(
  BlurView,
  (theme, props) => [
    StyleSheet.absoluteFillObject,
    props.preset === 'error' && {
      backgroundColor: tinycolor(theme.pallette.danger)
        .setAlpha(IS_IOS ? 0.4 : 0.1)
        .toRgbString(),
    },
  ],
  (theme): BlurViewProps => ({
    blurAmount: 5,
    blurRadius: 25,
    blurType: theme.isDark ? (IS_ANDROID ? 'light' : 'dark') : 'xlight',
    overlayColor: tinycolor(theme.pallette.grey[500])
      .setAlpha(0.1)
      .toRgbString(),
  }),
);
