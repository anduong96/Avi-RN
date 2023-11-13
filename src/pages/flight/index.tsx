import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { useRoute } from '@react-navigation/native';

import type { FlightStackParams } from '@app/navigation/flight.stack';

import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { vibrate } from '@app/lib/haptic.feedback';
import { ScrollUp } from '@app/components/scroll.up';
import { CloseBtn } from '@app/components/btn.close';
import { useFlightQuery } from '@app/generated/server.gql';
import { PageContainer } from '@app/components/page.container';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { useScrollPosition } from '@app/lib/hooks/use.scroll.position';
import { FlightPageLocationSection } from '@app/pages/flight/location.section';
import { transformFlightData } from '@app/lib/transformers/transform.flight.data';
import { FlightPageDistanceSeparator } from '@app/pages/flight/distance.separator';

import { TsaCard } from './tsa';
import { TravelMap } from './travel.map';
import { AircraftCard } from './aircraft';
import { FlightActions } from './actions';
import { EmissionCard } from './emission';
import { FlightContext } from './context';
import { HeaderMeta } from './header.meta';
import { SmartStatus } from './smart.status';
import { ExitToHomeBtn } from './exit.to.home.btn';
import { PromptnessCompact } from './promptness.compact';

type Route = RouteProp<FlightStackParams, 'Flight'>;

export const FlightPage: React.FC = () => {
  const route = useRoute<Route>();
  const flightID = route.params.flightID;
  const isFromSearch = route.params.isFromSearch;
  const container = React.useRef<ScrollView>(null);
  const scrollPosition = useScrollPosition();
  const flightResponse = useFlightQuery({ variables: { flightID } });
  const flight = flightResponse.data?.flight;
  const data = flight ? transformFlightData(flight) : null;

  const handleScrollUp = () => {
    vibrate('effectClick');
    container.current?.scrollTo({ animated: true, y: 0 });
  };

  return (
    <PageContainer>
      <FlightContext.Provider
        value={{
          flight: flight!,
          flightID,
        }}
      >
        <LoadingOverlay isDark isLoading={flightResponse.loading} />
        {flight && data && (
          <Container
            onScroll={scrollPosition.handleScroll}
            ref={container}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[1]}
          >
            <TravelMap />
            <HeaderMeta />
            <FlightActions />
            <Content>
              <SmartStatus />
              <Card hasShadow>
                <FlightPageLocationSection {...data.origin} type="origin" />
                <FlightPageDistanceSeparator />
                <FlightPageLocationSection
                  {...data.destination}
                  type="destination"
                />
              </Card>
              <PromptnessCompact />
              <TsaCard />
              <EmissionCard />
              <AircraftCard />
              <ScrollUp
                isVisible={scrollPosition.isAtBottom}
                onScrollUp={handleScrollUp}
              />
            </Content>
          </Container>
        )}
        <CloseBtn isAbsolute />
        <ExitToHomeBtn isVisible={isFromSearch} />
      </FlightContext.Provider>
    </PageContainer>
  );
};

const Container = withStyled(ScrollView, undefined, (theme) => ({
  contentContainerStyle: {
    flexGrow: 1,
    gap: theme.space.small,
    paddingBottom: WINDOW_HEIGHT * 0.3,
  },
  showsVerticalScrollIndicator: false,
}));

const Content = withStyled(View, (theme) => [
  {
    flexGrow: 1,
    gap: theme.space.medium,
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.large,
  },
]);
