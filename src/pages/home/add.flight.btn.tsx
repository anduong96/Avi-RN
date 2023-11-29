import * as React from 'react';

import tinycolor from 'tinycolor2';

import type { ShadowProps } from '@app/components/shadow';

import { withStyled } from '@app/lib/styled';
import { Shadow } from '@app/components/shadow';
import { vibrate } from '@app/lib/haptic.feedback';
import { FaIcon } from '@app/components/icons.fontawesome';
import { AnimatedTouchable } from '@app/components/animated.touchable';
import { useRootNavigation } from '@app/navigation/use.root.navigation';

export const AddFlightBtn: React.FC = () => {
  const navigation = useRootNavigation();

  const handlePress = () => {
    vibrate('effectHeavyClick');
    navigation.push('FlightSearch');
  };

  return (
    <ShadowWrapper>
      <Btn activeOpacity={0.8} onPress={handlePress}>
        <Icon name="plus" size={30} />
      </Btn>
    </ShadowWrapper>
  );
};

const ShadowWrapper = withStyled(
  Shadow,
  (theme) => [
    {
      borderRadius: theme.roundRadius,
    },
  ],
  (theme): ShadowProps => ({
    color: tinycolor(theme.pallette.primary).darken(10).toRgbString(),
    level: 1,
    opacity: 0.7,
  }),
);

const Btn = withStyled(AnimatedTouchable, (theme) => [
  {
    aspectRatio: 1,
    backgroundColor: theme.pallette.primary,
    borderRadius: theme.roundRadius,
    padding: theme.space.medium,
  },
]);

const Icon = withStyled(FaIcon, (theme) => [
  {
    color: theme.isDark ? theme.pallette.black : theme.pallette.white,
  },
]);
