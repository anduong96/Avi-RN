import * as React from 'react';

import { ScrollView, View } from 'react-native';

import { AlertFlightButton } from '@app/components/button.alerts.flight';
import { BlurView } from '@react-native-community/blur';
import { DebugNoficationFlightBtn } from '@app/components/button.debug.notif.flight';
import { ENV } from '@app/env';
import { FlightPageDistanceSeparator } from '@app/components/flight.page/distance.separator';
import { FlightPageLocationSection } from '@app/components/flight.page/location.section';
import { FlightPageTopHeader } from '@app/components/flight.page/top.header';
import type { FlightStackParams } from '@app/stacks/flight.stack';
import { LoadingContainer } from '@app/components/loading.container';
import { PageContainer } from '@app/components/page.container';
import { PromptnessCompact } from './promptness.compact';
import type { RouteProp } from '@react-navigation/native';
import { SaveFlightButton } from '@app/components/button.save.flight';
import { ShareFlightButton } from '@app/components/button.share.flight';
import { VerticalDivider } from '@app/components/divider.vertical';
import moment from 'moment';
import { styled } from '@app/lib/styled';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@app/lib/hooks/use.theme';

type Route = RouteProp<FlightStackParams, 'Flight'>;

export const FlightPage: React.FC = () => {
  const route = useRoute<Route>();
  const theme = useTheme();
  const flightID = route.params.flightID;

  const flightResponse = useGetFlightQuery({
    variables: {
      flightID,
    },
  });

  return (
    <PageContainer>
      <LoadingContainer loading={flightResponse.loading}>
        {() => {
          const flight = flightResponse.data?.flight;

          if (!flight) {
            return <View />;
          }

          return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[0]}
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <Header blurType="light">
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
                  {/* <AltFlightsButton flightID={flightID} /> */}
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
                    airport={flight.origin}
                    timezone={flight.originTimezone}
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
                    airport={flight.destination}
                    timezone={flight.destinationTimezone}
                    airportIata={flight.destinationIata}
                    terminal={flight.destinationTerminal}
                    gate={flight.destinationGate}
                    estimatedMovementTime={flight.estimatedGateArrival}
                    scheduledMovementTime={flight.scheduledGateArrival}
                    actualMovementTime={flight.actualGateArrival}
                  />
                </Meta>
                <PromptnessCompact
                  airlineIata={flight.airlineIata}
                  flightNumber={flight.flightNumber}
                />
              </Content>
            </ScrollView>
          );
        }}
      </LoadingContainer>
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
    paddingVertical: theme.space.medium,
    gap: theme.space.small,
  },
]);
