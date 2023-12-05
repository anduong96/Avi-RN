import * as React from 'react';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { FaIcon } from '@app/components/icons.fontawesome';
import { AnimatedTouchable } from '@app/components/animated.touchable';
import { PrimaryBackground } from '@app/components/background.primary';
import { useRootNavigation } from '@app/navigation/use.root.navigation';

export const AddFlightBtn: React.FC = () => {
  const navigation = useRootNavigation();

  const handlePress = () => {
    vibrate('effectHeavyClick');
    navigation.push('FlightSearch');
  };

  return (
    <Btn activeOpacity={0.8} onPress={handlePress}>
      <PrimaryBackground />
      <Icon name="plus" size={30} />
    </Btn>
  );
};

const Btn = withStyled(AnimatedTouchable, (theme) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    borderRadius: theme.roundRadius,
    overflow: 'hidden',
    padding: theme.space.medium + 5,
  },
]);

const Icon = withStyled(FaIcon, (theme) => [
  {
    color: theme.isDark ? theme.pallette.black : theme.pallette.white,
  },
]);
