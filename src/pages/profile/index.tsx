import * as React from 'react';

import { View } from 'react-native';

import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { styled } from '@app/lib/styled';

export const ProfilePage: React.FC = () => {
  return (
    <PageContainer>
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
