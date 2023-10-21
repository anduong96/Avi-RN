import type {
  ActivityIndicatorProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { BlurView } from '@react-native-community/blur';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  isDark?: boolean;
  isRound?: boolean;
  isLoading?: boolean;
  size?: ActivityIndicatorProps['size'];
  style?: StyleProp<ViewStyle>;
  type?: 'blur' | 'solid' | 'translucent';
};

export const LoadingOverlay: React.FC<Props> = ({
  isDark,
  isLoading,
  size = 'large',
  style,
  isRound,
  type = 'solid',
}) => {
  const theme = useTheme();
  const _isDark = isDark ?? theme.isDark;
  if (!isLoading) {
    return null;
  }

  return (
    <Container
      isRound={isRound}
      exiting={FadeOut}
      isDark={_isDark}
      style={[style]}
      type={type}
    >
      <Content entering={FadeIn.delay(750)}>
        {isLoading && type === 'blur' && (
          <BlurView blurType="dark" style={[StyleSheet.absoluteFill]} />
        )}

        <ActivityIndicator color={_isDark ? 'white' : 'black'} size={size} />
      </Content>
    </Container>
  );
};

const Container = withStyled<
  Pick<Props, 'isDark' | 'type' | 'isRound'>,
  typeof Animated.View
>(Animated.View, (theme, props) => [
  {
    borderRadius: theme.borderRadius,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  props.isRound && {
    borderRadius: theme.roundRadius,
  },
  props.type === 'translucent' &&
    props.isDark && {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  props.type === 'translucent' &&
    !props.isDark && {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  props.type === 'solid' &&
    props.isDark && {
      backgroundColor: theme.pallette.background,
    },
  props.type === 'solid' &&
    !props.isDark && {
      backgroundColor: '#fff',
    },
]);

const Content = withStyled(Animated.View, (theme) => [
  theme.presets.centered,
  {
    borderRadius: theme.borderRadius,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
]);
