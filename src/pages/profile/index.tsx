import * as React from 'react';

import { Button } from '@app/components/button';
import type { MainStackParam } from '@app/stacks';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { View } from 'react-native';
import { styled } from '@app/lib/styled';
import { useNavigation } from '@react-navigation/native';

type Navigation = NativeStackNavigationProp<MainStackParam, 'Profile'>;

export const ProfilePage: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <PageContainer>
      <PageHeader title="Profile" withoutInsets />
      <Content>
        <Button
          onPress={() => {
            navigation.push('Debug');
          }}
        >
          Debug
        </Button>
      </Content>
    </PageContainer>
  );
};

const Content = styled(View, (theme) => [
  {
    padding: theme.space.medium,
  },
]);
