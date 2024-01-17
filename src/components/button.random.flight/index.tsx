import * as React from 'react';
import { Keyboard, Text, TouchableOpacity } from 'react-native';

import { Portal } from '@gorhom/portal';

import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useRandomFlightMutation } from '@app/generated/server.gql';

import { FaIcon } from '../icons.fontawesome';
import { useToast } from '../toast/use.toast';
import { LoadingOverlay } from '../loading.overlay';
import { PortalWindowOverlay } from '../portal.window.overlay';

type Props = {
  onFlight: (flight: FullFlightFragmentFragment) => void;
  withLabel?: boolean;
};

export const RandomFlightBtn: React.FC<Props> = ({ onFlight, withLabel }) => {
  const toast = useToast();
  const [getFlight, { loading }] = useRandomFlightMutation({
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
    Keyboard.dismiss();
    getFlight();
  };

  return (
    <>
      <Btn disabled={loading} onPress={handlePress}>
        <FaIcon name="dice" />
        {withLabel && <Label>Random Flight</Label>}
      </Btn>
      {loading && (
        <Portal>
          <PortalWindowOverlay>
            <LoadingOverlay isLoading type="blur" />
          </PortalWindowOverlay>
        </Portal>
      )}
    </>
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
