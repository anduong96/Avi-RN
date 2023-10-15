import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { styled } from '@app/lib/styled';
import { Avatar } from '@app/components/avatar';
import { CloseBtn } from '@app/components/btn.close';
import { Typography } from '@app/components/typography';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { PageContainer } from '@app/components/page.container';
import { SpaceVertical } from '@app/components/space.vertical';

import { AccountConnectCard } from './account.connect.card';

export const ProfilePage: React.FC = () => {
  const exit = useExitPage();

  return (
    <PageContainer>
      <RightActions>
        <CloseBtn onPress={exit} />
      </RightActions>
      <Content>
        <AvatarContainer>
          <Avatar hasShadow size={75} />
        </AvatarContainer>
        <SpaceVertical size="medium" />
        <Section>
          <SectionTitle>Connect</SectionTitle>
          <AccountConnectCard />
        </Section>
      </Content>
    </PageContainer>
  );
};

const AvatarContainer = styled(View, (theme) => [theme.presets.centered]);

const RightActions = styled(View, (theme) => [
  {
    position: 'absolute',
    right: theme.space.medium,
    top: theme.space.medium,
  },
]);

const Content = styled(ScrollView, undefined, (theme) => ({
  contentContainerStyle: {
    flexGrow: 1,
    gap: theme.space.large,
    padding: theme.space.medium,
  },
}));

const Section = styled(View, (theme) => [
  {
    gap: theme.space.small,
  },
]);

const SectionTitle = styled(Typography, undefined, {
  type: 'h2',
});
