import * as React from 'react';

import { isNil } from 'lodash';

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
import { useToast } from '../toast/use.toast';

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
      toast({ title: 'Flight Added!' });
    },
    onError() {
      toast({
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
