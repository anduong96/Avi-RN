import * as React from 'react';

import { vibrate } from '@app/lib/haptic.feedback';
import { FlightPushSubState } from '@app/state/flight.push.sub';
import { FlightStatus, useFlightQuery } from '@app/generated/server.gql';

import { Button } from '../button';

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
  const isEnabled = FlightPushSubState.useSelect(
    (s) => s.subscriptions[flightID]?.pushEnabled ?? false,
  );
  const [type, icon] = isEnabled
    ? (['primary', 'bell-on'] as const)
    : (['default', 'bell'] as const);

  const handleToggle = () => {
    vibrate('impactLight');
    isEnabled
      ? FlightPushSubState.actions.disablePush(flightID)
      : FlightPushSubState.actions.enablePush(flightID);
  };

  return (
    <Button
      disabled={isDisabled}
      hasShadow={isEnabled}
      icon={icon}
      iconProps={{ solid: isEnabled }}
      isBold={isEnabled}
      isLoading={isLoading}
      isSolid={isEnabled}
      onPress={handleToggle}
      type={type}
    >
      Alerts
    </Button>
  );
};
