import * as React from 'react';

import { Text, View } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { styled } from '@app/lib/styled';
import { useFcmToken } from '@app/lib/hooks/use.fcm.token';

export const DebugMenuPage: React.FC = () => {
  const fcmToken = useFcmToken();

  return (
    <PageContainer>
      <PageHeader withoutInsets title="Debug" />
      <Content>
        <Text>Bundle: {DeviceInfo.getBundleId()}</Text>
        <Text>FCM: {fcmToken ?? ''}</Text>
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
