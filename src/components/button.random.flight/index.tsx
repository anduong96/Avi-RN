import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import * as ting from '@baronha/ting';

import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

import { styled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useGetRandomFlightLazyQuery } from '@app/generated/server.gql';

import { FaIcon } from '../icons.fontawesome';
import { LoadingOverlay } from '../loading.overlay';

type Props = {
  onFlight: (flight: FullFlightFragmentFragment) => void;
  withLabel?: boolean;
};

export const RandomFlightBtn: React.FC<Props> = ({ onFlight, withLabel }) => {
  const [getFlight, { loading }] = useGetRandomFlightLazyQuery({
    onCompleted(data) {
      onFlight(data.randomFlight);
    },
    onError(error) {
      ting.toast({
        position: 'top',
        preset: 'error',
        title: error.message,
      });
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

const Btn = styled(TouchableOpacity, (theme) => [
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

const Label = styled(Text, (theme) => [theme.typography.presets.p1]);
