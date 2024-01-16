import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';

import { useRoute } from '@react-navigation/native';

import type { FlightStackParams } from '@app/navigation/flight.stack';

import { CloseBtn } from '@app/components/btn.close';
import { useFlightQuery } from '@app/generated/server.gql';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { PageContainer } from '@app/components/page.container';
import { LoadingOverlay } from '@app/components/loading.overlay';

import { FlightContext } from './context';
import { FlightContent } from './content';
import { ExitToHomeBtn } from './exit.to.home.btn';

type Route = RouteProp<FlightStackParams, 'Flight'>;

export const FlightPage: React.FC = () => {
  const exit = useExitPage();
  const route = useRoute<Route>();
  const flightID = route.params.flightID;
  const isFromSearch = route.params.isFromSearch;
  const [lastRefreshed, setLastRefreshed] = React.useState(new Date());
  const flightResponse = useFlightQuery({
    onCompleted: () => {
      setLastRefreshed(new Date());
    },
    variables: {
      flightID,
    },
  });

  const flight = flightResponse.data?.flight;

  return (
    <PageContainer>
      <FlightContext.Provider
        value={{ flight: flight!, flightID, lastRefreshed }}
      >
        <LoadingOverlay isDark isLoading={flightResponse.loading} />
        {flight && <FlightContent />}
        {isFromSearch && <ExitToHomeBtn />}
        <CloseBtn isAbsolute onPress={exit} />
      </FlightContext.Provider>
    </PageContainer>
  );
};
