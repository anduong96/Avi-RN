import * as React from 'react';
import FastImage from 'react-native-fast-image';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from 'react-native-reanimated';

import tinycolor from 'tinycolor2';

import { withStyled } from '@app/lib/styled';
import { Button } from '@app/components/button';
import { useUser } from '@app/state/user/use.user';
import { FaIcon } from '@app/components/icons.fontawesome';
import { signInWithApple } from '@app/lib/auth/apple.auth';
import { signInWithGoogle } from '@app/lib/auth/google.auth';

import { LoadingOverlay } from '../loading.overlay';

type Props = {
  onFinish?: () => void;
};

export const SignInSheet: React.FC<Props> = ({ onFinish }) => {
  const user = useUser();
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  React.useEffect(() => {
    if (!user.isAnonymous) {
      onFinish?.();
    }
  }, [user, onFinish]);

  const handleSignIn = async (type: 'apple' | 'google') => {
    try {
      setIsSigningIn(true);
      switch (type) {
        case 'google':
          await signInWithGoogle();
          break;
        case 'apple':
          await signInWithApple();
          break;
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Container>
      <Pressable
        onPress={() => onFinish?.()}
        style={[StyleSheet.absoluteFillObject]}
      />
      <Content>
        <LoadingOverlay isLoading={isSigningIn} />
        <AppleSignInBtn
          isBold
          onPress={() => handleSignIn('apple')}
          prefix={<AppleIcon brand name="apple" />}
        >
          Continue with Apple
        </AppleSignInBtn>
        <GoogleSignInBtn
          isBold
          onPress={() => handleSignIn('google')}
          prefix={<GoogleIcon />}
        >
          Continue with Google
        </GoogleSignInBtn>
      </Content>
    </Container>
  );
};

const Container = withStyled(
  Animated.View,
  (theme) => [
    StyleSheet.absoluteFillObject,
    {
      backgroundColor: tinycolor(theme.pallette.grey[100])
        .setAlpha(0.9)
        .toRgbString(),
    },
  ],
  {
    entering: FadeIn.duration(300),
    exiting: FadeOut.delay(300),
  },
);

const Content = withStyled(
  Animated.View,
  (theme) => [
    {
      backgroundColor: theme.pallette.background,
      borderRadius: theme.borderRadius,
      bottom: 0,
      gap: theme.space.large,
      left: 0,
      paddingBottom: theme.insets.bottom || theme.space.large,
      paddingHorizontal: theme.space.large,
      paddingVertical: theme.space.xLarge,
      position: 'absolute',
      right: 0,
    },
  ],
  {
    entering: FadeInDown.delay(300),
    exiting: FadeOutDown.duration(300),
  },
);

const AppleSignInBtn = withStyled(
  Button,
  (theme) => [
    {
      backgroundColor: theme.pallette.white,
      borderWidth: 0,
      gap: theme.space.small,
    },
  ],
  (theme) => ({
    textStyle: [
      theme.typography.presets.h4,
      {
        color: theme.pallette.black,
      },
    ],
  }),
);

const AppleIcon = withStyled(
  FaIcon,
  () => [],
  (theme) => ({
    color: theme.pallette.black,
    size: 40,
  }),
);

const GoogleSignInBtn = withStyled(
  Button,
  (theme) => [
    {
      gap: theme.space.small,
    },
  ],
  (theme) => ({
    textStyle: [theme.typography.presets.h4],
  }),
);

const GoogleIcon = withStyled(
  FastImage,
  () => [
    {
      aspectRatio: 1,
      height: 35,
    },
  ],
  {
    resizeMode: FastImage.resizeMode.contain,
    source: require('@app/assets/google.png'),
  },
);
