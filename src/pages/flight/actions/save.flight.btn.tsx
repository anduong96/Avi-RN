import * as React from 'react';

import { isNil } from 'lodash';

import { vibrate } from '@app/lib/haptic.feedback';
import { useToast } from '@app/components/toast/use.toast';
import {
  UserActiveFlightsDocument,
  UserArchivedFlightsDocument,
  UserHasFlightsDocument,
  useAddUserFlightMutation,
  useDeleteUserFlightMutation,
  useUserFlightQuery,
} from '@app/generated/server.gql';

import { ActionBtn } from './action.btn';

type Props = {
  flightID: string;
};

export const SaveFlightButton: React.FC<Props> = ({ flightID }) => {
  const toast = useToast();
  const userFlightResp = useUserFlightQuery({
    errorPolicy: 'ignore',
    variables: {
      flightID,
    },
  });

  const [add, { loading: adding }] = useAddUserFlightMutation({
    onCompleted() {
      vibrate('notificationSuccess');
      toast({ title: 'Flight Added!' });
    },
    onError() {
      vibrate('notificationError');
      toast({ preset: 'error', title: 'Failed to add flight' });
    },
    refetchQueries: [
      { query: UserActiveFlightsDocument },
      { query: UserArchivedFlightsDocument },
      { query: UserHasFlightsDocument },
    ],
    variables: {
      flightID,
    },
  });
  const [remove, { loading: removing }] = useDeleteUserFlightMutation({
    onCompleted() {
      toast({ title: 'Flight Removed!' });
    },
    onError() {
      toast({
        preset: 'error',
        title: 'Failed to remove flight',
      });
    },
    refetchQueries: [
      { query: UserActiveFlightsDocument },
      { query: UserArchivedFlightsDocument },
      { query: UserHasFlightsDocument },
    ],
    variables: {
      flightID,
    },
  });

  const isSaved = !isNil(userFlightResp.data?.userFlight?.id);
  const isLoading = userFlightResp.loading || adding || removing;

  const handlePress = async () => {
    vibrate('impactHeavy');
    isSaved ? await remove() : await add();
    await userFlightResp.refetch();
  };

  return (
    <ActionBtn
      icon="bookmark"
      isActive={isSaved}
      isLoading={isLoading}
      label={isSaved ? 'Saved' : 'Save'}
      onPress={handlePress}
    />
  );
};
