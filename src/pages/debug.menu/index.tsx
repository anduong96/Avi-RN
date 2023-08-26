import * as React from 'react';

import { Text, View } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import { ENV } from '@app/env';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import messaging from '@react-native-firebase/messaging';
import { styled } from '@app/lib/styled';
import { useFcmToken } from '@app/lib/hooks/use.fcm.token';

export const DebugMenuPage: React.FC = () => {
  const fcmToken = useFcmToken();
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribeToTopic = () => {
    if (isSubscribed) {
      setIsSubscribed(false);
      messaging().unsubscribeFromTopic(ENV.APP_ENV);
    } else {
      setIsSubscribed(true);
      messaging().subscribeToTopic(ENV.APP_ENV);
    }
  };

  React.useEffect(() => {
    return () => {
      messaging().unsubscribeFromTopic(ENV.APP_ENV);
    };
  }, []);

  return (
    <PageContainer>
      <PageHeader withoutInsets title="Debug" />
      <Content>
        <Text>Bundle: {DeviceInfo.getBundleId()}</Text>
        <Text>FCM: {fcmToken ?? ''}</Text>
        <TouchableOpacity onPress={handleSubscribeToTopic}>
          <Text>
            Subscribe to {ENV.APP_ENV} topic:{' '}
            {isSubscribed ? 'enabled' : 'disabled'}
          </Text>
        </TouchableOpacity>
      </Content>
    </PageContainer>
  );
};

const Content = styled(View, (theme) => [
  {
    padding: theme.space.medium,
    gap: theme.space.small,
  },
]);
