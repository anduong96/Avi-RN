import * as React from 'react';

import { vibrate } from '@app/lib/haptic.feedback';
import { useDebugFlightNotificationMutation } from '@app/generated/server.gql';

import { Button } from '../button';
import { useToast } from '../toast/use.toast';

type Props = {
  flightID: string;
};

export const DebugNotificationFlightBtn: React.FC<Props> = ({ flightID }) => {
  const toast = useToast();
  const [send, { loading }] = useDebugFlightNotificationMutation({
    onCompleted(data) {
      vibrate('notificationSuccess');
      toast({
        preset: 'info',
        title: `Sent ${data._sendFlightNotification} notification`,
      });
    },
    onError(error) {
      vibrate('notificationError');
      toast({
        preset: 'error',
        title: error.message,
      });
    },
    variables: {
      body: 'body',
      data: {
        url: `flywithavi://flights/${flightID}`,
      },
      flightID,
      title: 'title',
    },
  });

  return (
    <Button isLoading={loading} isSolid onPress={send} type="primary">
      [DEBUG] Send Notification
    </Button>
  );
};
