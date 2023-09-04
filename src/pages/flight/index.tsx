import * as React from 'react';

import { RefreshControl, ScrollView, View } from 'react-native';

import { AlertFlightButton } from '@app/components/button.alerts.flight';
import { AltFlightsButton } from '@app/components/button.alt.flights';
import { BlurView } from '@react-native-community/blur';
import { DebugNoficationFlightBtn } from '@app/components/button.debug.notif.flight';
import { DividerDashed } from '@app/components/divider.dashed';
import { ENV } from '@app/env';
import FastImage from 'react-native-fast-image';
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
            <Wrapper>
              <Header>
                <FlightPageTopHeader flight={flight} />
                <FastImage
                  resizeMode="contain"
                  style={{
                    width: 70,
                    height: undefined,
                    aspectRatio: 1,
                  }}
                  source={{
                    uri: flight.airline.logoCompactImageURL,
                  }}
                />
              </Header>
              <ScrollView
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => flightResponse.refetch()}
                    refreshing={flightResponse.loading}
                  />
                }
              >
                <BlurView blurType="light">
                  <Actions
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: theme.space.medium,
                      paddingVertical: theme.space.medium,
                      alignItems: 'center',
                      gap: theme.space.small,
                    }}
                  >
                    <SaveFlightButton flightID={flightID} />
                    <VerticalDivider />
                    <AlertFlightButton flightID={flightID} />
                    <AltFlightsButton flightID={flightID} />
                    <ShareFlightButton flightID={flightID} />
                    {ENV.APP_ENV !== 'production' && (
                      <>
                        <VerticalDivider />
                        <DebugNoficationFlightBtn flightID={flightID} />
                      </>
                    )}
                  </Actions>
                </BlurView>
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
            </Wrapper>
          );
        }}
      </LoadingContainer>
    </PageContainer>
  );
};

const Wrapper = styled(View, () => [{ flexGrow: 1 }]);

const Content = styled(View, (theme) => [
  {
    padding: theme.space.small,
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

const Actions = styled(ScrollView, () => []);

const Header = styled(View, (theme) => [
  {
    paddingVertical: theme.space.small,
    paddingHorizontal: theme.space.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
]);
