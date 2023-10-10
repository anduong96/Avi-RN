import * as React from 'react';
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { TouchableOpacity } from '@gorhom/bottom-sheet';
import messaging from '@react-native-firebase/messaging';

import { ENV } from '@app/env';
import { styled } from '@app/lib/styled';
import { PageHeader } from '@app/components/page.header';
import { useFcmToken } from '@app/lib/hooks/use.fcm.token';
import { PageContainer } from '@app/components/page.container';

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
      <PageHeader title="Debug" withoutInsets />
      <Content>
        <Text>Bundle: {DeviceInfo.getBundleId()}</Text>
        <Text selectable>FCM: {fcmToken ?? ''}</Text>
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
    gap: theme.space.small,
    padding: theme.space.medium,
  },
]);
