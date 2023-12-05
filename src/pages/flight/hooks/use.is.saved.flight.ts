import { isNil } from '@app/lib/is.nil';
import { useUserFlightQuery } from '@app/generated/server.gql';

import { useFlightID } from '../context';

export function useIsSavedFlight() {
  const flightID = useFlightID();
  const request = useUserFlightQuery({
    errorPolicy: 'ignore',
    variables: {
      flightID,
    },
  });

  const isSaved = !isNil(request.data?.userFlight?.id);

  return {
    loading: request.loading,
    refetch: request.refetch,
    value: isSaved,
  };
}
