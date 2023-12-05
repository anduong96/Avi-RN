import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { withStyled } from '@app/lib/styled';
import { Avatar } from '@app/components/avatar';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { CloseBtn } from '@app/components/btn.close';
import { ScrollUp } from '@app/components/scroll.up';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { PageContainer } from '@app/components/page.container';
import { SpaceVertical } from '@app/components/space.vertical';
import { useScrollPosition } from '@app/lib/hooks/use.scroll.position';

import { LegalCard } from './legal.card';
import { SignOutBtn } from './sign.out.btn';
import { SettingsCard } from './settings.card';
import { AccountConnectCard } from './account.connect.card';

export const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const exit = useExitPage();
  const content = React.useRef<ScrollView>(null);
  const scrollPosition = useScrollPosition();

  const handleScrollUp = () => {
    vibrate('impactLight');
    content.current?.scrollTo({ y: 0 });
  };

  return (
    <PageContainer>
      <RightActions>
        <CloseBtn onPress={exit} />
      </RightActions>
      <Content
        onScroll={scrollPosition.handleScroll}
        ref={content}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <SignOut>
          <SignOutBtn />
        </SignOut>
        <AvatarContainer>
          <Avatar hasShadow={theme.isDark} size={150} />
        </AvatarContainer>
        <SpaceVertical size="medium" />
        <Section>
          <AccountConnectCard />
        </Section>
        <Section>
          <SettingsCard />
        </Section>
        <Section>
          <LegalCard />
        </Section>
        <ScrollUp
          isVisible={scrollPosition.isAtBottom}
          onScrollUp={handleScrollUp}
        />
      </Content>
    </PageContainer>
  );
};

const AvatarContainer = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    paddingTop: theme.space.large,
  },
]);

const RightActions = withStyled(View, (theme) => [
  {
    position: 'absolute',
    right: theme.space.medium,
    top: theme.space.medium,
    zIndex: 1,
  },
]);

const Content = withStyled(ScrollView, undefined, (theme) => ({
  contentContainerStyle: {
    flexGrow: 1,
    gap: theme.space.large,
    padding: theme.space.medium,
    paddingBottom: WINDOW_HEIGHT * 0.5,
    paddingHorizontal: theme.space.small,
  },
}));

const Section = withStyled(View, (theme) => [
  {
    gap: theme.space.small,
  },
]);

const SignOut = withStyled(View, () => [
  {
    alignItems: 'flex-start',
    flexBasis: 1,
    minHeight: 50,
  },
]);
