import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { styled } from '@app/lib/styled';
import { Avatar } from '@app/components/avatar';
import { ModalHeader } from '@app/components/modal.header';
import { PageContainer } from '@app/components/page.container';
import { SpaceVertical } from '@app/components/space.vertical';

import { AccountConnectCard } from './account.connect.card';

export const ProfilePage: React.FC = () => {
  return (
    <PageContainer>
      <ModalHeader withClose />
      <Content>
        <AvatarContainer>
          <Avatar hasShadow size={75} />
        </AvatarContainer>
        <SpaceVertical size="medium" />
        <AccountConnectCard />
      </Content>
    </PageContainer>
  );
};

const AvatarContainer = styled(View, (theme) => [theme.presets.centered]);

const Content = styled(ScrollView, undefined, (theme) => ({
  contentContainerStyle: {
    flexGrow: 1,
    gap: theme.space.large,
    padding: theme.space.medium,
  },
}));
