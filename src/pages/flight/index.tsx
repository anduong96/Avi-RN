import * as React from 'react';

import { ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AltFlightsButton } from '@app/components/button.alt.flights';
import Animated from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { FlightPageDistanceSeparator } from '@app/components/flight.page/distance.separator';
import { FlightPageLocationSection } from '@app/components/flight.page/location.section';
import { FlightPageTopHeader } from '@app/components/flight.page/top.header';
import type { FlightStackParams } from '@app/stacks/flight.stack';
import { LoadingContainer } from '@app/components/loading.container';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import type { RouteProp } from '@react-navigation/native';
import { SaveFlightButton } from '@app/components/button.save.flight';
import { ShareFlightButton } from '@app/components/button.share.flight';
import { VerticalDivider } from '@app/components/divider.vertical';
import { styled } from '@app/lib/styled';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightStackParams, 'Flight'>;
type Route = RouteProp<FlightStackParams, 'Flight'>;

export const FlightPage: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();
  const theme = useTheme();
  const flightID = route.params.flightID;
  const flightResponse = useGetFlightQuery({
    variables: {
      flightID,
    },
  });

  const handleGoBack = () => {
    vibrate('impactMedium');
    navigation.goBack();
  };

  return (
    <PageContainer>
      <LoadingContainer loading={flightResponse.loading}>
        {() => {
          const flight = flightResponse.data?.flight;

          if (!flight) {
            return <></>;
          }

          return (
            <Wrapper>
              <PageHeader
                withBack
                onPressBack={handleGoBack}
                align="center"
                title={<>{flight && <FlightPageTopHeader flight={flight} />}</>}
              />
              <ActionsWrapper />
              <ScrollView
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
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
                    <AltFlightsButton flightID={flightID} />
                    <ShareFlightButton flightID={flightID} />
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
                      duration={
                        flight.actualDuration ?? flight.estimatedDuration
                      }
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
                </Content>
              </ScrollView>
            </Wrapper>
          );
        }}
      </LoadingContainer>
    </PageContainer>
  );
};

const Wrapper = styled(View, () => []);

const Content = styled(View, (theme) => [
  {
    padding: theme.space.medium,
    gap: theme.space.xlarge,
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

const ActionsWrapper = styled(Animated.View, () => []);

const Actions = styled(ScrollView, () => []);
