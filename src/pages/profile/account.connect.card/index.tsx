import * as React from 'react';
import FastImage from 'react-native-fast-image';
import { FadeIn } from 'react-native-reanimated';
import { TouchableOpacity, View } from 'react-native';

import { styled } from '@app/lib/styled';
import { useUser } from '@app/state/user';
import { Card } from '@app/components/card';
import { vibrate } from '@app/lib/haptic.feedback';
import { StatusIcon } from '@app/components/icon.status';
import { FaIcon } from '@app/components/icons.fontawesome';
import { signInWithApple } from '@app/lib/auth/apple.auth';
import { signInWithGoogle } from '@app/lib/auth/google.auth';
import { LoadingOverlay } from '@app/components/loading.overlay';

const APPLE_PROVIDER_ID = 'apple.com' as const;
const GOOGLE_PROVIDER_ID = 'google.com' as const;

export const AccountConnectCard: React.FC = () => {
  const user = useUser();
  const [isLoading, setLoading] = React.useState(false);

  const handleSignin = async (providerID: string) => {
    try {
      vibrate('impactLight');
      setLoading(true);
      switch (providerID) {
        case GOOGLE_PROVIDER_ID:
          await signInWithGoogle();
          break;
        case APPLE_PROVIDER_ID:
          await signInWithApple();
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const getIsConnected = (providerID: string) => {
    return user.isAnonymous
      ? false
      : user.providerData.some(
          (provider) => provider.providerId === providerID,
        );
  };

  const isAppleConnected = getIsConnected(APPLE_PROVIDER_ID);
  const isGoogleConnected = getIsConnected(GOOGLE_PROVIDER_ID);

  return (
    <Card gap="medium">
      <LoadingOverlay isDark isLoading={isLoading} type="blur" />
      <Content>
        <AppleBtn
          disabled={isAppleConnected}
          onPress={() => handleSignin(APPLE_PROVIDER_ID)}
        >
          <AppleIcon name="apple" />
          {isAppleConnected && <Status status="success" />}
        </AppleBtn>
        <GoogleBtn
          disabled={isGoogleConnected}
          onPress={() => handleSignin(GOOGLE_PROVIDER_ID)}
        >
          <GoogleIcon source={require('@app/assets/google.png')} />
          {isAppleConnected && <Status status="success" />}
        </GoogleBtn>
      </Content>
    </Card>
  );
};

const Content = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
  },
]);

const Btn = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  theme.presets.shadows[200],
  {
    aspectRatio: 1,
    borderRadius: theme.borderRadius,
    padding: theme.space.medium,
  },
]);

const AppleBtn = styled(Btn, (theme) => [
  {
    backgroundColor: theme.isDark ? theme.pallette.white : theme.pallette.black,
  },
]);

const GoogleBtn = styled(Btn, (theme) => [
  {
    backgroundColor: theme.isDark ? theme.pallette.white : theme.pallette.black,
  },
]);

const AppleIcon = styled(
  FaIcon,
  (theme) => [
    {
      color: theme.isDark ? theme.pallette.black : theme.pallette.white,
    },
  ],
  (theme) => ({
    size: theme.typography.presets.h1.fontSize,
  }),
);

const GoogleIcon = styled(FastImage, (theme) => [
  {
    aspectRatio: 1,
    width: theme.typography.presets.h1.fontSize,
  },
]);

const Status = styled(
  StatusIcon,
  (theme) => [
    {
      bottom: -theme.space.small / 2,
      position: 'absolute',
      right: -theme.space.small / 2,
    },
  ],
  {
    entering: FadeIn.delay(100),
    hasShadow: true,
  },
);
