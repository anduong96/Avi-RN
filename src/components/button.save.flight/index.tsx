import * as React from 'react';

import { isNil } from 'lodash';
import * as ting from '@baronha/ting';

import { vibrate } from '@app/lib/haptic.feedback';
import {
  GetUserActiveFlightsDocument,
  GetUserArchivedFlightsDocument,
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
  const [loading, setLoading] = React.useState(false);
  const userFlightResp = useUserFlightQuery({
    errorPolicy: 'ignore',
    variables: {
      flightID,
    },
  });

  const [add] = useAddUserFlightMutation({
    onCompleted() {
      ting.toast({
        title: 'Flight Added!',
      });
    },
    refetchQueries: [
      { query: GetUserActiveFlightsDocument },
      { query: GetUserArchivedFlightsDocument },
      { query: UserHasFlightsDocument },
    ],
    variables: {
      flightID,
    },
  });
  const [remove] = useDeleteUserFlightMutation({
    onCompleted() {
      ting.toast({
        title: 'Flight Removed!',
      });
    },
    refetchQueries: [
      { query: GetUserActiveFlightsDocument },
      { query: GetUserArchivedFlightsDocument },
      { query: UserHasFlightsDocument },
    ],
    variables: {
      flightID,
    },
  });

  const isSaved = !isNil(userFlightResp.data?.userFlight?.id);
  const isLoading = userFlightResp.loading || loading;
  const [label, type] = isSaved
    ? (['Saved', 'primary'] as const)
    : (['Save', 'default'] as const);

  const handlePress = async () => {
    vibrate('impactHeavy');
    setLoading(true);
    isSaved ? await remove() : await add();
    await userFlightResp.refetch();
    setLoading(false);
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
