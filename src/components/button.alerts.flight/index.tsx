import * as React from 'react';

import { vibrate } from '@app/lib/haptic.feedback';
import { FlightStatus, useFlightQuery } from '@app/generated/server.gql';
import { useFlightNotificationsState } from '@app/state/flights.notifications';
import { enableFlightPush } from '@app/state/flights.notifications/flight.push.enable';
import { disableFlightPush } from '@app/state/flights.notifications/flight.push.disable';

import { Button } from '../button';
import { Shadow } from '../shadow';

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
  const [type, icon] = isPushEnabled
    ? (['primary', 'bell-on'] as const)
    : (['default', 'bell'] as const);

  const handleToggle = () => {
    vibrate('effectClick');

    if (isPushEnabled) {
      disableFlightPush(flightID);
    } else {
      enableFlightPush(flightID);
    }
  };

  return (
    <Shadow borderRadius={'round'} disabled={!isPushEnabled} level={1}>
      <Button
        disabled={isDisabled}
        icon={icon}
        iconProps={{ solid: isPushEnabled }}
        isBold={isPushEnabled}
        isLoading={isLoading}
        isSolid={isPushEnabled}
        onPress={handleToggle}
        type={type}
      >
        Alerts
      </Button>
    </Shadow>
  );
};
