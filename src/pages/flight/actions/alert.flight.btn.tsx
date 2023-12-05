import * as React from 'react';

import { logger } from '@app/lib/logger';
import { vibrate } from '@app/lib/haptic.feedback';
import { FlightStatus } from '@app/generated/server.gql';
import { useToast } from '@app/components/toast/use.toast';
import { enableFlightPush } from '@app/state/flights.notifications/flight.push.enable';
import { disableFlightPush } from '@app/state/flights.notifications/flight.push.disable';

import { useFlight } from '../context';
import { ActionBtn } from './action.btn';
import { useIsSavedFlight } from '../hooks/use.is.saved.flight';
import { useIsAlertEnabled } from '../hooks/use.is.alert.enabled';

type Props = {
  flightID: string;
};

export const AlertFlightButton: React.FC<Props> = ({ flightID }) => {
  const isPushEnabled = useIsAlertEnabled();
  const flight = useFlight();
  const isSaved = useIsSavedFlight();
  const toast = useToast();
  const isDisabled = flight.status === FlightStatus.ARCHIVED;

  const handleToggle = () => {
    vibrate('effectClick');
    logger.debug(
      'Flight Push Toggled flightID=%s, enabled=%s',
      flightID,
      !isPushEnabled,
    );

    if (!isSaved.value) {
      return toast({
        description: ' Flight must be saved first',
        preset: 'error',
        title: 'Error!',
      });
    }

    if (isPushEnabled) {
      disableFlightPush(flightID);
    } else {
      enableFlightPush(flightID);
    }
  };

  if (isDisabled) {
    return null;
  }

  return (
    <ActionBtn
      icon={isPushEnabled ? 'bell-on' : 'bell'}
      isActive={isPushEnabled && isSaved.value}
      isLoading={isSaved.loading}
      label={'Alert'}
      onPress={handleToggle}
    />
  );
};
