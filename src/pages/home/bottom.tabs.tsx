import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '@app/navigation';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FaIcon } from '@app/components/icons.fontawesome';
import { BlurredBackground } from '@app/components/blurred/background';

export const BottomTabs: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<MainStack>();

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
      <Item isActive onPress={() => vibrate('effectHeavyClick')}>
        <FaIcon
          color={theme.pallette.active}
          name="house-blank"
          size={20}
          solid
        />
      </Item>
      <User onPress={() => handleNavigation('Profile')}>
        <FaIcon
          color={theme.pallette.grey[500]}
          name="user-astronaut"
          sharpSolid
          size={20}
          solid
        />
      </User>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    borderRadius: theme.roundRadius,
    flexDirection: 'row',
    gap: theme.space.tiny,
    justifyContent: 'flex-start',
    padding: theme.borderWidth,
  },
]);

const Item = withStyled<{ isActive?: boolean }, typeof TouchableOpacity>(
  TouchableOpacity,
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
  }),
);

const User = withStyled(Item, () => [], {});

const Rounded = withStyled(View, (theme) => [
  StyleSheet.absoluteFill,
  {
    borderRadius: theme.roundRadius,
    overflow: 'hidden',
  },
  !theme.isDark && [
    {
      borderColor: theme.pallette.borderColor,
      borderWidth: StyleSheet.hairlineWidth,
    },
  ],
]);
