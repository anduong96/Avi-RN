import * as React from 'react';

import { vibrate } from '@app/lib/haptic.feedback';
import { useToast } from '@app/components/toast/use.toast';
import {
  UserActiveFlightsDocument,
  UserArchivedFlightsDocument,
  UserHasFlightsDocument,
  useAddUserFlightMutation,
  useDeleteUserFlightMutation,
} from '@app/generated/server.gql';

import { ActionBtn } from './action.btn';
import { useIsSavedFlight } from '../hooks/use.is.saved.flight';

type Props = {
  flightID: string;
};

export const SaveFlightButton: React.FC<Props> = ({ flightID }) => {
  const toast = useToast();
  const isSaved = useIsSavedFlight();
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

  const isLoading = isSaved.loading || adding || removing;

  const handlePress = async () => {
    vibrate('impactHeavy');
    isSaved.value ? await remove() : await add();
    await isSaved.refetch();
  };

  return (
    <ActionBtn
      icon="bookmark"
      isActive={isSaved.value}
      isLoading={isLoading}
      label={isSaved.value ? 'Saved' : 'Save'}
      onPress={handlePress}
    />
  );
};
