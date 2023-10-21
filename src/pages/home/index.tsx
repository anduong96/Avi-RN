import * as React from 'react';
import { RefreshControl, Text, View } from 'react-native';
import {
  ScrollView,
  Swipeable,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  FadeInDown,
  SlideInLeft,
  SlideOutLeft,
} from 'react-native-reanimated';

import { isEmpty } from 'lodash';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';

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
  GetUserActiveFlightsDocument,
  UserHasFlightsDocument,
  useDeleteUserFlightMutation,
  useGetUserActiveFlightsQuery,
  useGetUserArchivedFlightsQuery,
} from '@app/generated/server.gql';

import { BottomTabs } from './bottom.tabs';
import { AddFlightBtn } from './add.flight.btn';

export const HomePage: React.FC = () => {
  const prompt = usePrompt();
  const flights = useGetUserActiveFlightsQuery();
  const archived = useGetUserArchivedFlightsQuery();
  const rootNav = useRootNavigation();
  const scrollPosition = useScrollPosition();
  const scroll = React.useRef<ScrollView>(null);
  const activeFlights = flights.data?.userActiveFlights;
  const archivedFlights = archived.data?.userArchivedFlights;
  const hasArchivedFlights = !isEmpty(archivedFlights);

  const [removeFlight] = useDeleteUserFlightMutation({
    refetchQueries: [
      { query: GetUserActiveFlightsDocument },
      { query: UserHasFlightsDocument },
    ],
  });

  const handleOpenArchivedFlights = () => {
    vibrate('impactMedium');
    rootNav.push('FlightsArchive');
  };

  const handleScrollTop = () => {
    vibrate('impactMedium');
    scroll.current?.scrollTo({ animated: true, y: 0 });
  };

  const handleRemoveFlight = (flightID: string) => {
    vibrate('impactHeavy');
    prompt({
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
    rootNav.push('FlightStack', {
      params: {
        flightID,
      },
      screen: 'Flight',
    });
  };

  return (
    <PageContainer>
      <Page>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: WINDOW_HEIGHT * 0.5,
          }}
          onScroll={scrollPosition.handleScroll}
          ref={scroll}
          refreshControl={
            <RefreshControl
              onRefresh={() => flights.refetch()}
              refreshing={false}
            />
          }
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <Content>
            <Header>
              <Title>Your</Title>
              <Title>Flights ✈️</Title>
            </Header>
            <ListHeader>
              <View />
              <ListActions>
                <ArchivedFlightsBtn
                  disabled={!hasArchivedFlights}
                  icon="rectangle-history"
                  onPress={handleOpenArchivedFlights}
                >
                  Archive
                </ArchivedFlightsBtn>
              </ListActions>
            </ListHeader>
            <List>
              {activeFlights?.map((flight, index) => (
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
              ))}
            </List>
          </Content>
          <ScrollUp
            isAbsolute={false}
            isVisible={scrollPosition.isAtBottom}
            onScrollUp={handleScrollTop}
          />
        </ScrollView>
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

const Header = withStyled(View, (theme) => [
  {
    paddingBottom: theme.space.small,
    paddingHorizontal: theme.space.large,
    paddingTop: theme.insets.top,
  },
]);

const ListHeader = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space.medium,
  },
]);

const ListActions = withStyled(View, () => [{}]);

const Title = withStyled(Text, (theme) => [theme.typography.presets.massive]);

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

const List = withStyled(View, () => []);

const Content = withStyled(View, (theme) => [
  {
    gap: theme.space.medium,
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
