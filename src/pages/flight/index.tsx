import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';
import { ScrollView, View } from 'react-native';

import moment from 'moment';
import { useRoute } from '@react-navigation/native';

import type { FlightStackParams } from '@app/navigation/flight.stack';

import { ENV } from '@app/env';
import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { useTheme } from '@app/lib/hooks/use.theme';
import { CloseBtn } from '@app/components/btn.close';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { PageContainer } from '@app/components/page.container';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { VerticalDivider } from '@app/components/divider.vertical';
import { FlightPageTopHeader } from '@app/pages/flight/top.header';
import { SaveFlightButton } from '@app/components/button.save.flight';
import { ShareFlightButton } from '@app/components/button.share.flight';
import { AlertFlightButton } from '@app/components/button.alerts.flight';
import { FlightPageLocationSection } from '@app/pages/flight/location.section';
import { FlightPageDistanceSeparator } from '@app/pages/flight/distance.separator';
import { DebugNotificationFlightBtn } from '@app/components/button.debug.notif.flight';

import { AircraftCard } from './aircraft';
import { ExitToHomeBtn } from './exit.to.home.btn';
import { PromptnessCompact } from './promptness.compact';

type Route = RouteProp<FlightStackParams, 'Flight'>;

export const FlightPage: React.FC = () => {
  const route = useRoute<Route>();
  const theme = useTheme();
  const flightID = route.params.flightID;
  const isFromSearch = route.params.isFromSearch;
  const flightResponse = useGetFlightQuery({
    variables: {
      flightID,
    },
  });
  const flight = flightResponse.data?.flight;

  return (
    <PageContainer>
      <LoadingOverlay isDark isLoading={flightResponse.loading} />
      <Close>
        <CloseBtn />
      </Close>
      {flight && (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: theme.space.medium,
            paddingBottom: WINDOW_HEIGHT * 0.3,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Header>
            <FlightPageTopHeader flight={flight} />
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                gap: theme.space.small,
                paddingHorizontal: theme.space.medium,
                paddingVertical: theme.space.small,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <SaveFlightButton flightID={flightID} />
              <VerticalDivider />
              <AlertFlightButton flightID={flightID} />
              <ShareFlightButton flightID={flightID} />
              {ENV.APP_ENV !== 'production' && (
                <>
                  <VerticalDivider />
                  <DebugNotificationFlightBtn flightID={flightID} />
                </>
              )}
            </ScrollView>
          </Header>
          <Content>
            <Card hasShadow>
              <FlightPageLocationSection
                actualMovementTime={flight.actualGateDeparture}
                airport={flight.Origin}
                airportIata={flight.originIata}
                estimatedMovementTime={flight.estimatedGateDeparture}
                gate={flight.originGate}
                scheduledMovementTime={flight.scheduledGateDeparture}
                terminal={flight.originTerminal}
                timezone={flight.Origin.timezone}
                type="origin"
              />

              <FlightPageDistanceSeparator
                duration={moment(flight.estimatedGateArrival).diff(
                  flight.estimatedGateDeparture,
                )}
              />
              <FlightPageLocationSection
                actualMovementTime={flight.actualGateArrival}
                airport={flight.Destination}
                airportIata={flight.destinationIata}
                baggageClaim={flight.destinationBaggageClaim}
                estimatedMovementTime={flight.estimatedGateArrival}
                gate={flight.destinationGate}
                scheduledMovementTime={flight.scheduledGateArrival}
                terminal={flight.destinationTerminal}
                timezone={flight.Destination.timezone}
                type="destination"
              />
            </Card>
            <PromptnessCompact flightID={flightID} />
            {flight.aircraftTailNumber && (
              <AircraftCard tailNumber={flight.aircraftTailNumber} />
            )}
          </Content>
        </ScrollView>
      )}
      {isFromSearch && <ExitToHomeBtn flightID={flightID} />}
    </PageContainer>
  );
};

const Content = withStyled(View, (theme) => [
  {
    flexGrow: 1,
    gap: theme.space.medium,
    paddingHorizontal: theme.space.medium,
  },
]);

const Header = withStyled(View, (theme) => [
  {
    backgroundColor: theme.pallette.background,
    gap: theme.space.small,
    paddingBottom: theme.space.small,
    paddingTop: theme.space.medium,
  },
]);

const Close = withStyled(View, (theme) => [
  {
    position: 'absolute',
    right: theme.space.medium,
    top: theme.space.medium,
    zIndex: 1,
  },
]);
