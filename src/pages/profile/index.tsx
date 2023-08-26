import * as React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { ENV } from '@app/env';
import type { MainStackParam } from '@app/stacks';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { styled } from '@app/lib/styled';
import { useNavigation } from '@react-navigation/native';

type Navigation = NativeStackNavigationProp<MainStackParam, 'Profile'>;

export const ProfilePage: React.FC = () => {
  const isProd = ENV.APP_ENV === 'production';
  const navigation = useNavigation<Navigation>();

  return (
    <PageContainer>
      {!isProd && (
        <DebugBanner onPress={() => navigation.push('Debug')} activeOpacity={1}>
          <DebugText>Open Debug Menu</DebugText>
        </DebugBanner>
      )}
      <PageHeader title="Profile" withoutInsets />
      <Content />
    </PageContainer>
  );
};

const Content = styled(View, (theme) => [
  {
    padding: theme.space.medium,
  },
]);

const DebugBanner = styled(TouchableOpacity, (theme) => [
  {
    padding: theme.space.medium,
    backgroundColor: theme.pallette.grey[900],
  },
]);

const DebugText = styled(Text, (theme) => [
  {
    color: theme.pallette.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
]);
