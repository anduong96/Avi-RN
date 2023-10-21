import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';
import { ScrollView, View } from 'react-native';

import moment from 'moment';
import tinycolor from 'tinycolor2';
import { useRoute } from '@react-navigation/native';

import type { FlightStackParams } from '@app/navigation/flight.stack';

import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { CloseBtn } from '@app/components/btn.close';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { PageContainer } from '@app/components/page.container';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { FlightPageTopHeader } from '@app/pages/flight/top.header';
import { FlightPageLocationSection } from '@app/pages/flight/location.section';
import { FlightPageDistanceSeparator } from '@app/pages/flight/distance.separator';

import { AircraftCard } from './aircraft';
import { FlightActions } from './actions';
import { FlightTitle } from './flight.title';
import { ExitToHomeBtn } from './exit.to.home.btn';
import { PromptnessCompact } from './promptness.compact';

type Route = RouteProp<FlightStackParams, 'Flight'>;

export const FlightPage: React.FC = () => {
  const route = useRoute<Route>();
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
      {flight && (
        <Container stickyHeaderIndices={[0]}>
          <Header>
            <FlightPageTopHeader flight={flight} />
          </Header>
          <FlightTitle flight={flight} />
          <FlightActions flightID={flight.id} />
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
        </Container>
      )}
      <CloseBtn isAbsolute />
      <ExitToHomeBtn flightID={flightID} isVisible={isFromSearch} />
    </PageContainer>
  );
};

const Container = withStyled(ScrollView, undefined, (theme) => ({
  contentContainerStyle: {
    flexGrow: 1,
    gap: theme.space.medium,
    paddingBottom: WINDOW_HEIGHT * 0.3,
  },
  showsVerticalScrollIndicator: false,
}));

const Content = withStyled(View, (theme) => [
  {
    flexGrow: 1,
    gap: theme.space.medium,
    paddingHorizontal: theme.space.medium,
  },
]);

const Header = withStyled(View, (theme) => [
  {
    backgroundColor: tinycolor(theme.pallette.background)
      .setAlpha(0.9)
      .toRgbString(),
    paddingBottom: theme.space.small,
    paddingTop: theme.space.medium,
  },
]);
