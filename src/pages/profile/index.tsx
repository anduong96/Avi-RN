import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { styled } from '@app/lib/styled';
import { Avatar } from '@app/components/avatar';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { CloseBtn } from '@app/components/btn.close';
import { Typography } from '@app/components/typography';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { PageContainer } from '@app/components/page.container';
import { SpaceVertical } from '@app/components/space.vertical';

import { LegalCard } from './legal.card';
import { SignOutBtn } from './sign.out.btn';
import { SettingsCard } from './settings.card';
import { AccountConnectCard } from './account.connect.card';

export const ProfilePage: React.FC = () => {
  const exit = useExitPage();

  return (
    <PageContainer>
      <RightActions>
        <CloseBtn onPress={exit} />
      </RightActions>
      <Content showsVerticalScrollIndicator={false}>
        <SignOut>
          <SignOutBtn />
        </SignOut>
        <AvatarContainer>
          <Avatar hasShadow size={75} />
        </AvatarContainer>
        <SpaceVertical size="medium" />
        <Section>
          <SectionTitle>Connect</SectionTitle>
          <AccountConnectCard />
        </Section>
        <Section>
          <SectionTitle>Settings</SectionTitle>
          <SettingsCard />
        </Section>
        <Section>
          <SectionTitle>Legal</SectionTitle>
          <LegalCard />
        </Section>
      </Content>
    </PageContainer>
  );
};

const AvatarContainer = styled(View, (theme) => [
  theme.presets.centered,
  {
    paddingTop: theme.space.large,
  },
]);

const RightActions = styled(View, (theme) => [
  {
    position: 'absolute',
    right: theme.space.medium,
    top: theme.space.medium,
    zIndex: 1,
  },
]);

const Content = styled(ScrollView, undefined, (theme) => ({
  contentContainerStyle: {
    flexGrow: 1,
    gap: theme.space.large,
    padding: theme.space.medium,
    paddingBottom: WINDOW_HEIGHT * 0.5,
  },
}));

const Section = styled(View, (theme) => [
  {
    gap: theme.space.small,
  },
]);

const SectionTitle = styled(Typography, undefined, {
  type: 'h3',
});

const SignOut = styled(View, () => [
  {
    alignItems: 'flex-start',
    flexBasis: 1,
    minHeight: 50,
  },
]);
