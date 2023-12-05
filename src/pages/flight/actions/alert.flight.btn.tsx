import * as React from 'react';

import { logger } from '@app/lib/logger';
import { vibrate } from '@app/lib/haptic.feedback';
import { FlightStatus, useFlightQuery } from '@app/generated/server.gql';
import { useFlightNotificationsState } from '@app/state/flights.notifications';
import { enableFlightPush } from '@app/state/flights.notifications/flight.push.enable';
import { disableFlightPush } from '@app/state/flights.notifications/flight.push.disable';

import { ActionBtn } from './action.btn';

type Props = {
  flightID: string;
};

export const AlertFlightButton: React.FC<Props> = ({ flightID }) => {
  const flight = useFlightQuery({
    variables: {
      flightID,
    },
  });
  const isLoading = flight.loading;
  const isDisabled = flight.data?.flight.status === FlightStatus.ARCHIVED;
  const notification = useFlightNotificationsState((s) =>
    s.getFlightPush(flightID),
  );
  const isPushEnabled = notification.pushEnabled;

  const handleToggle = () => {
    vibrate('effectClick');
    logger.debug(
      'Flight Push Toggled flightID=%s, enabled=%s',
      flightID,
      !isPushEnabled,
    );

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
      isActive={isPushEnabled}
      isLoading={isLoading}
      label={'Alert'}
      onPress={handleToggle}
    />
  );
};
