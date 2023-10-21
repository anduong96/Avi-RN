import * as React from 'react';
import { LogBox } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { BlurView } from '@react-native-community/blur';

import { useUser } from '@app/state/user';
import { Button } from '@app/components/button';
import { withStyled } from '@app/lib/styled';
import { FaIcon } from '@app/components/icons.fontawesome';
import { signInWithApple } from '@app/lib/auth/apple.auth';
import { signInWithGoogle } from '@app/lib/auth/google.auth';

LogBox.ignoreLogs([
  '`useBottomSheetDynamicSnapPoints` will be deprecated in the next major release! please use the new introduce prop `enableDynamicSizing`',
]);

export const SignInSheet: React.FC = () => {
  const user = useUser();

  if (!user.isAnonymous) {
    return null;
  }

  return (
    <Content
      blurType="dark"
      entering={SlideInDown.duration(1000)}
      exiting={SlideOutDown.duration(1000)}
    >
      <AppleSignInBtn
        isBold
        onPress={() => signInWithApple()}
        prefix={<AppleIcon brand name="apple" />}
      >
        Continue with Apple
      </AppleSignInBtn>
      <GoogleSignInBtn
        isBold
        onPress={() => signInWithGoogle()}
        prefix={<GoogleIcon />}
      >
        Continue with Google
      </GoogleSignInBtn>
    </Content>
  );
};

const Content = withStyled(
  Animated.createAnimatedComponent(BlurView),
  (theme) => [
    {
      borderRadius: theme.borderRadius,
      bottom: 0,
      gap: theme.space.medium,
      left: 0,
      paddingBottom: theme.insets.bottom || theme.space.large,
      paddingHorizontal: theme.space.medium,
      paddingVertical: theme.space.large,
      position: 'absolute',
      right: 0,
    },
  ],
);

const AppleSignInBtn = withStyled(
  Button,
  (theme) => [
    {
      backgroundColor: theme.pallette.white,
      borderWidth: 0,
    },
  ],
  (theme) => ({
    textStyle: [
      theme.typography.presets.h2,
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
  () => [],
  (theme) => ({
    textStyle: [theme.typography.presets.h2],
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
