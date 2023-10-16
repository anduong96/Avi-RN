import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '@app/navigation';

import { styled } from '@app/lib/styled';
import { IconBtn } from '@app/components/icon.btn';
import { vibrate } from '@app/lib/haptic.feedback';
import { BlurredBackground } from '@app/components/blurred.background';

export const BottomTabs: React.FC = () => {
  const navigation = useNavigation<MainStack<'Home'>>();

  const handleNavigation = (
    ...params: Parameters<(typeof navigation)['push']>
  ) => {
    vibrate('effectClick');
    navigation.push(...params);
  };

  return (
    <Container>
      <Rounded>
        <BlurredBackground />
      </Rounded>
      <Item
        icon="house-blank"
        isActive
        onPress={() => vibrate('effectHeavyClick')}
      />
      <User icon="user-astronaut" onPress={() => handleNavigation('Profile')} />
    </Container>
  );
};

const Container = styled(View, (theme) => [
  {
    alignItems: 'center',
    borderRadius: theme.roundRadius,
    flexDirection: 'row',
    gap: theme.space.tiny,
    justifyContent: 'flex-start',
    padding: theme.borderWidth,
  },
]);

const Item = styled<{ isActive?: boolean }, typeof IconBtn>(
  IconBtn,
  (theme, props) => [
    {
      borderRadius: theme.roundRadius,
      paddingHorizontal: theme.space.medium,
      paddingVertical: theme.space.medium,
    },
    props.isActive && {
      backgroundColor: theme.pallette.background,
    },
  ],
  (theme, props) => ({
    activeOpacity: props.isActive ? 1 : undefined,
    color: props.isActive
      ? theme.pallette.active
      : theme.pallette.textSecondary,
    size: 20,
  }),
);

const User = styled(Item, () => [], {
  size: 20,
});

const Rounded = styled(View, (theme) => [
  StyleSheet.absoluteFill,
  {
    borderRadius: theme.roundRadius,
    overflow: 'hidden',
  },
]);
