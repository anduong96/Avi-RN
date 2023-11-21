import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useRandomFlightLazyQuery } from '@app/generated/server.gql';

import { FaIcon } from '../icons.fontawesome';
import { useToast } from '../toast/use.toast';
import { LoadingOverlay } from '../loading.overlay';

type Props = {
  onFlight: (flight: FullFlightFragmentFragment) => void;
  withLabel?: boolean;
};

export const RandomFlightBtn: React.FC<Props> = ({ onFlight, withLabel }) => {
  const toast = useToast();
  const [getFlight, { loading }] = useRandomFlightLazyQuery({
    onCompleted(data) {
      onFlight(data.randomFlight);
    },
    onError(error) {
      vibrate('notificationError');
      toast({ preset: 'error', title: error.message });
    },
  });

  const handlePress = () => {
    vibrate('impactHeavy');
    getFlight();
  };

  return (
    <Btn disabled={loading} onPress={handlePress}>
      <LoadingOverlay isDark isLoading={loading} size="small" type="solid" />
      <FaIcon name="dice" />
      {withLabel && <Label>Random Flight</Label>}
    </Btn>
  );
};

const Btn = withStyled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    borderColor: theme.pallette.borderColor,
    borderRadius: theme.roundRadius,
    borderWidth: theme.borderWidth,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.small,
  },
]);

const Label = withStyled(Text, (theme) => [theme.typography.presets.p1]);
