import * as React from 'react';

import { isNil } from 'lodash';
import * as ting from '@baronha/ting';

import { vibrate } from '@app/lib/haptic.feedback';
import {
  UserActiveFlightsDocument,
  UserArchivedFlightsDocument,
  UserHasFlightsDocument,
  useAddUserFlightMutation,
  useDeleteUserFlightMutation,
  useUserFlightQuery,
} from '@app/generated/server.gql';

import { Button } from '../button';

type Props = {
  flightID: string;
};

export const SaveFlightButton: React.FC<Props> = ({ flightID }) => {
  const userFlightResp = useUserFlightQuery({
    errorPolicy: 'ignore',
    variables: {
      flightID,
    },
  });

  const [add, { loading: adding }] = useAddUserFlightMutation({
    onCompleted() {
      ting.toast({
        title: 'Flight Added!',
      });
    },
    onError() {
      ting.toast({
        position: 'top',
        preset: 'error',
        title: 'Failed to add flight',
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
  const [remove, { loading: removing }] = useDeleteUserFlightMutation({
    onCompleted() {
      ting.toast({
        title: 'Flight Removed!',
      });
    },
    onError() {
      ting.toast({
        position: 'top',
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
  const [label, type] = isSaved
    ? (['Saved', 'primary'] as const)
    : (['Save', 'default'] as const);

  const handlePress = async () => {
    vibrate('impactHeavy');
    isSaved ? await remove() : await add();
    await userFlightResp.refetch();
  };

  return (
    <Button
      hasShadow={isSaved}
      icon="bookmark"
      iconProps={{ light: !isSaved }}
      isBold={isSaved}
      isLoading={isLoading}
      isSolid={isSaved}
      onPress={handlePress}
      type={type}
    >
      {label}
    </Button>
  );
};
