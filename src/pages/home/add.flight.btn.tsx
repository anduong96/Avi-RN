import * as React from 'react';

import tinycolor from 'tinycolor2';

import { styled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { FaIcon } from '@app/components/icons.fontawesome';
import { AnimatedTouchable } from '@app/components/animated.touchable';
import { useRootNavigation } from '@app/navigation/use.root.navigation';

export const AddFlightBtn: React.FC = () => {
  const navigation = useRootNavigation();

  const handlePress = () => {
    vibrate('effectHeavyClick');
    setTimeout(() => {
      navigation.push('FlightSearch');
    }, 300);
  };

  return (
    <Btn activeOpacity={0.8} onPress={handlePress}>
      <Icon name="plus" size={30} />
    </Btn>
  );
};

const Btn = styled(AnimatedTouchable, (theme) => [
  theme.presets.shadows[100],
  {
    aspectRatio: 1,
    backgroundColor: theme.pallette.primary,
    borderRadius: theme.roundRadius,
    padding: theme.space.medium,
    shadowColor: tinycolor(theme.pallette.primary).darken(30).toHexString(),
    shadowOpacity: 1,
  },
]);

const Icon = styled(FaIcon, (theme) => [
  {
    color: theme.pallette.black,
  },
]);
