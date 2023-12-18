import * as React from 'react';
import { Image } from 'react-native';
import Animated from 'react-native-reanimated';

import tinycolor from 'tinycolor2';

import { withStyled } from '@app/lib/styled';
import { useUserState } from '@app/state/user';
import { useTheme } from '@app/lib/hooks/use.theme';

import { Shadow } from '../shadow';

type Props = {
  hasShadow?: boolean;
  size?: number;
};

export const Avatar: React.FC<Props> = ({ hasShadow, size = 20 }) => {
  const theme = useTheme();
  const colors = useUserState((state) => state.colors);

  const getColor = () => {
    return tinycolor(colors.neon);
  };

  return (
    <ShadowWrapper
      color={getColor().darken(30).toRgbString()}
      disabled={!hasShadow}
      distance={20}
      offset={[size * 0.1, size * 0.1]}
      opacity={0.3}
    >
      <Container color={getColor().setAlpha(0.4).toRgbString()}>
        <Image
          resizeMethod="auto"
          resizeMode="contain"
          source={require('@app/assets/logo_white.png')}
          style={{
            aspectRatio: 1,
            height: Math.max(size - theme.space.large, theme.space.large + 10),
            tintColor: getColor().darken(30).toRgbString(),
          }}
        />
      </Container>
    </ShadowWrapper>
  );
};

const ShadowWrapper = withStyled(Shadow, (theme) => [
  {
    borderRadius: theme.roundRadius,
  },
]);

const Container = withStyled<{ color: string }, typeof Animated.View>(
  Animated.View,
  (theme, props) => [
    theme.presets.centered,
    {
      aspectRatio: 1,
      backgroundColor: props.color,
      borderRadius: theme.roundRadius,
      padding: theme.space.large,
    },
  ],
);
