import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import type {
  ActivityIndicatorProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { isNil } from 'lodash';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { BlurredBackground } from '@app/components/blurred/background';

type Props = {
  backgroundColor?: string;
  isDark?: boolean;
  isLoading?: boolean;
  isRound?: boolean;
  size?: ActivityIndicatorProps['size'];
  style?: StyleProp<ViewStyle>;
  type?: 'blur' | 'solid' | 'translucent';
};

export const LoadingOverlay: React.FC<Props> = ({
  backgroundColor,
  isDark,
  isLoading,
  isRound,
  size = 'large',
  style,
  type = 'solid',
}) => {
  const theme = useTheme();
  const _isDark = isDark ?? theme.isDark;

  if (!isLoading) {
    return null;
  }

  return (
    <Container
      backgroundColor={backgroundColor}
      exiting={FadeOut}
      isDark={_isDark}
      isRound={isRound}
      style={[style]}
      type={type}
    >
      <Content entering={FadeIn.delay(750)}>
        {isLoading && type === 'blur' && <BlurredBackground />}
        <ActivityIndicator color={_isDark ? 'white' : 'black'} size={size} />
      </Content>
    </Container>
  );
};

const Container = withStyled<Props, typeof Animated.View>(
  Animated.View,
  (theme, props) => [
    {
      bottom: 0,
      elevation: 999,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 999,
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
        backgroundColor: theme.pallette.grey[50],
      },
    props.type === 'solid' &&
      !props.isDark && {
        backgroundColor: theme.pallette.grey[50],
      },
    !isNil(props.backgroundColor) && {
      backgroundColor: props.backgroundColor,
    },
  ],
);

const Content = withStyled(Animated.View, (theme) => [
  theme.presets.centered,
  {
    borderRadius: theme.borderRadius,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
]);
