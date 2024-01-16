import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';

import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { useNetInfoInstance } from '@react-native-community/netinfo';

import type { FlightStackParams } from '@app/navigation/flight.stack';

import { CloseBtn } from '@app/components/btn.close';
import { useLogger } from '@app/lib/logger/use.logger';
import { useFlightQuery } from '@app/generated/server.gql';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { useAppState } from '@app/lib/hooks/use.app.state';
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
  const logger = useLogger('FlightPage');
  const netInfo = useNetInfoInstance();
  const appState = useAppState();
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

  React.useEffect(() => {
    if (!netInfo.netInfo.isConnected || appState !== 'active') {
      logger.debug('No network connection: Stop polling');
      flightResponse.stopPolling();
    } else if (flight?.progressPercent && flight.progressPercent === 1) {
      logger.debug('Flight completed: Stop polling');
      flightResponse.stopPolling();
    } else {
      logger.debug('Flight not completed: Start polling');
      flightResponse.startPolling(
        moment.duration(5, 'minutes').asMilliseconds(),
      );
    }
  }, [flight, flightResponse, logger, netInfo, appState]);

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
