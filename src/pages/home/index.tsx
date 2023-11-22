import * as React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInDown,
  SlideInLeft,
  SlideOutLeft,
} from 'react-native-reanimated';

import { isEmpty } from 'lodash';
import { FlashList } from '@shopify/flash-list';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';

import type { UserActiveFlightsQuery } from '@app/generated/server.gql';

import { logger } from '@app/lib/logger';
import { format } from '@app/lib/format';
import { withStyled } from '@app/lib/styled';
import { Button } from '@app/components/button';
import { vibrate } from '@app/lib/haptic.feedback';
import { ScrollUp } from '@app/components/scroll.up';
import { FlightCard } from '@app/components/flight.card';
import { usePrompt } from '@app/components/prompt/use.prompt';
import { PageContainer } from '@app/components/page.container';
import { useScrollPosition } from '@app/lib/hooks/use.scroll.position';
import { useRootNavigation } from '@app/navigation/use.root.navigation';
import {
  UserActiveFlightsDocument,
  UserHasFlightsDocument,
  useDeleteUserFlightMutation,
  useUserActiveFlightsQuery,
  useUserArchivedFlightsQuery,
} from '@app/generated/server.gql';

import { BottomTabs } from './bottom.tabs';
import { AddFlightBtn } from './add.flight.btn';

export const HomePage: React.FC = () => {
  const prompt = usePrompt();
  const flights = useUserActiveFlightsQuery();
  const archived = useUserArchivedFlightsQuery();
  const rootNav = useRootNavigation();
  const scrollPosition = useScrollPosition();
  const activeFlights = flights.data?.userActiveFlights;
  const archivedFlights = archived.data?.userArchivedFlights;
  const hasArchivedFlights = !isEmpty(archivedFlights);
  const scroll =
    React.useRef<FlashList<UserActiveFlightsQuery['userActiveFlights'][0]>>(
      null,
    );

  const [removeFlight] = useDeleteUserFlightMutation({
    refetchQueries: [
      { query: UserActiveFlightsDocument },
      { query: UserHasFlightsDocument },
    ],
  });

  const handleOpenArchivedFlights = () => {
    vibrate('impactMedium');
    rootNav.push('FlightsArchive');
  };

  const handleScrollTop = () => {
    vibrate('impactMedium');
    scroll.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  const handleRemoveFlight = (flightID: string) => {
    vibrate('impactHeavy');
    prompt({
      acceptStatus: 'danger',
      onAccept: async () => {
        await removeFlight({
          variables: {
            flightID,
          },
        });
      },
    });
  };

  const handleOpenFlight = (flightID: string) => {
    vibrate('impactMedium');
    logger.debug(format('Home: pressed flightID=%s', flightID));
    rootNav.push('FlightStack', { params: { flightID }, screen: 'Flight' });
  };

  return (
    <PageContainer>
      <Page>
        <FlashList
          ListFooterComponent={() => {
            return (
              <ScrollUp
                isVisible={scrollPosition.isAtBottom}
                onScrollUp={handleScrollTop}
              />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <HeaderWrapper>
                <Header>
                  <Title>Your</Title>
                  <Title>Flights ✈️</Title>
                </Header>
                <Actions>
                  <ArchivedFlightsBtn
                    disabled={!hasArchivedFlights}
                    icon="rectangle-history"
                    onPress={handleOpenArchivedFlights}
                  >
                    Past
                  </ArchivedFlightsBtn>
                </Actions>
              </HeaderWrapper>
            );
          }}
          contentContainerStyle={{ paddingBottom: WINDOW_HEIGHT * 0.5 }}
          data={activeFlights}
          estimatedItemSize={200}
          onRefresh={() => flights.refetch()}
          onScroll={scrollPosition.handleScroll}
          ref={scroll}
          refreshing={false}
          renderItem={({ index, item: flight }) => {
            return (
              <Swipeable
                key={flight.id}
                renderRightActions={() => (
                  <ItemActions>
                    <DeleteFlightBtn
                      onPress={() => handleRemoveFlight(flight.flightID)}
                    >
                      <DeleteFlightBtnText>Remove</DeleteFlightBtnText>
                    </DeleteFlightBtn>
                  </ItemActions>
                )}
              >
                <Item
                  entering={SlideInLeft.delay(index * 50).duration(300)}
                  exiting={SlideOutLeft}
                  onPress={() => handleOpenFlight(flight.flightID)}
                >
                  <FlightCard value={flight} />
                </Item>
              </Swipeable>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
        <Footer>
          <BottomTabs />
          <AddFlightBtn />
        </Footer>
      </Page>
    </PageContainer>
  );
};

const Page = withStyled(View, (theme) => [
  {
    backgroundColor: theme.pallette.background,
    flexGrow: 1,
  },
]);

const HeaderWrapper = withStyled(View, (theme) => [
  {
    gap: theme.space.large,
  },
]);

const Header = withStyled(View, (theme) => [
  {
    paddingBottom: theme.space.small,
    paddingHorizontal: theme.space.large,
    paddingTop: theme.insets.top || theme.space.medium,
  },
]);

const Actions = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.tiny,
  },
]);

const Title = withStyled(Text, (theme) => [
  theme.typography.presets.massive,
  {
    color: theme.pallette.text,
  },
]);

const Item = withStyled(
  Animated.createAnimatedComponent(TouchableOpacity),
  (theme) => [
    {
      paddingHorizontal: theme.space.medium,
      paddingVertical: theme.space.medium / 2,
    },
  ],
);

const ItemActions = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.background,
    padding: theme.space.large,
    zIndex: 1,
  },
]);

const ArchivedFlightsBtn = withStyled(Button, (_, props) => [
  {
    opacity: props.disabled ? 0 : 1,
  },
]);

const DeleteFlightBtn = withStyled(TouchableOpacity, () => []);

const DeleteFlightBtnText = withStyled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.danger,
    fontWeight: 'bold',
  },
]);

const Footer = withStyled(
  Animated.View,
  (theme) => [
    {
      alignItems: 'center',
      bottom: theme.insets.bottom || theme.space.large,
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: 0,
      paddingHorizontal: theme.space.medium,
      position: 'absolute',
      right: 0,
    },
  ],
  {
    entering: FadeInDown,
  },
);
