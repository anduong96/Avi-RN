import * as React from 'react';

import { ScrollView, View } from 'react-native';

import { AlertFlightButton } from '@app/components/button.alerts.flight';
import { DebugNoficationFlightBtn } from '@app/components/button.debug.notif.flight';
import { SaveFlightButton } from '@app/components/button.save.flight';
import { ShareFlightButton } from '@app/components/button.share.flight';
import { VerticalDivider } from '@app/components/divider.vertical';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { PageContainer } from '@app/components/page.container';
import { ENV } from '@app/env';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { useTheme } from '@app/lib/hooks/use.theme';
import { styled } from '@app/lib/styled';
import { FlightPageDistanceSeparator } from '@app/pages/flight/distance.separator';
import { FlightPageLocationSection } from '@app/pages/flight/location.section';
import { FlightPageTopHeader } from '@app/pages/flight/top.header';
import type { FlightStackParams } from '@app/stacks/flight.stack';
import { BlurView } from '@react-native-community/blur';
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import { AircraftCard } from './aircraft';
import { ExitToHomeBtn } from './exit.to.home.btn';
import { PromptnessCompact } from './promptness.compact';
import { WINDOW_HEIGHT } from '@app/lib/platform';

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
      <LoadingOverlay isLoading={flightResponse.loading} />
      {flight && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{
            flexGrow: 1,
            gap: theme.space.medium,
            paddingBottom: WINDOW_HEIGHT * 0.1,
          }}
        >
          <Header blurType="xlight">
            <FlightPageTopHeader flight={flight} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: theme.space.medium,
                paddingVertical: theme.space.small,
                alignItems: 'center',
                gap: theme.space.small,
              }}
            >
              <SaveFlightButton flightID={flightID} />
              <VerticalDivider />
              <AlertFlightButton flightID={flightID} />
              <ShareFlightButton flightID={flightID} />
              {ENV.APP_ENV !== 'production' && (
                <>
                  <VerticalDivider />
                  <DebugNoficationFlightBtn flightID={flightID} />
                </>
              )}
            </ScrollView>
          </Header>
          <Content>
            <Meta>
              <FlightPageLocationSection
                type="origin"
                airport={flight.Origin}
                timezone={flight.Origin.timezone}
                airportIata={flight.originIata}
                terminal={flight.originTerminal}
                gate={flight.originGate}
                estimatedMovementTime={flight.estimatedGateDeparture}
                scheduledMovementTime={flight.scheduledGateDeparture}
                actualMovementTime={flight.actualGateDeparture}
              />

              <FlightPageDistanceSeparator
                duration={moment(flight.estimatedGateArrival).diff(
                  flight.estimatedGateDeparture,
                )}
              />
              <FlightPageLocationSection
                type="destination"
                airport={flight.Destination}
                timezone={flight.Destination.timezone}
                airportIata={flight.destinationIata}
                terminal={flight.destinationTerminal}
                gate={flight.destinationGate}
                estimatedMovementTime={flight.estimatedGateArrival}
                scheduledMovementTime={flight.scheduledGateArrival}
                actualMovementTime={flight.actualGateArrival}
                baggageClaim={flight.destinationBaggageClaim}
              />
            </Meta>
            <PromptnessCompact flightID={flightID} />
            {flight.aircraftTailnumber && (
              <AircraftCard tailNumber={flight.aircraftTailnumber} />
            )}
          </Content>
        </ScrollView>
      )}
      {isFromSearch && <ExitToHomeBtn flightID={flightID} />}
    </PageContainer>
  );
};

const Content = styled(View, (theme) => [
  {
    flexGrow: 1,
    paddingHorizontal: theme.space.small,
    gap: theme.space.medium,
  },
]);

const Meta = styled(View, (theme) => [
  theme.presets.shadows[100],
  {
    gap: theme.space.large,
    backgroundColor: theme.pallette.background,
    padding: theme.space.medium,
    borderRadius: theme.borderRadius,
  },
]);

const Header = styled(BlurView, (theme) => [
  {
    paddingTop: theme.space.medium,
    paddingBottom: 0,
    gap: theme.space.small,
  },
]);
