import * as React from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native';
import { FadeIn } from 'react-native-reanimated';

import { logger } from '@app/lib/logger';
import { format } from '@app/lib/format';
import { IS_IOS } from '@app/lib/platform';
import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { useUser } from '@app/state/user/use.user';
import { vibrate } from '@app/lib/haptic.feedback';
import { StatusIcon } from '@app/components/icon.status';
import { FaIcon } from '@app/components/icons.fontawesome';
import { signInWithApple } from '@app/lib/auth/apple.auth';
import { signInWithGoogle } from '@app/lib/auth/google.auth';

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
    } catch (error) {
      logger.error(format('Failed to sign in with provider=%s', providerID));
      logger.error(error);
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
    <Card direction="row" gap="medium" isLoading={isLoading} title="Connect">
      {IS_IOS && (
        <AppleBtn
          disabled={isAppleConnected}
          onPress={() => handleSignin(APPLE_PROVIDER_ID)}
        >
          <AppleIcon name="apple" />
          {isAppleConnected && <Status status="success" />}
        </AppleBtn>
      )}
      <GoogleBtn
        disabled={isGoogleConnected}
        onPress={() => handleSignin(GOOGLE_PROVIDER_ID)}
      >
        <GoogleIcon source={require('@app/assets/google.png')} />
        {isGoogleConnected && <Status status="success" />}
      </GoogleBtn>
    </Card>
  );
};

const Btn = withStyled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  theme.presets.shadows[200],
  {
    aspectRatio: 1,
    borderRadius: theme.borderRadius,
    padding: theme.space.medium,
  },
]);

const AppleBtn = withStyled(Btn, (theme) => [
  {
    backgroundColor: theme.pallette.white,
  },
]);

const GoogleBtn = withStyled(Btn, (theme) => [
  {
    backgroundColor: theme.pallette.white,
  },
]);

const AppleIcon = withStyled(
  FaIcon,
  (theme) => [
    {
      color: theme.pallette.black,
    },
  ],
  (theme) => ({
    size: theme.typography.presets.h1.fontSize,
  }),
);

const GoogleIcon = withStyled(FastImage, (theme) => [
  {
    aspectRatio: 1,
    width: theme.typography.presets.h1.fontSize,
  },
]);

const Status = withStyled(
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
