import type { ScrollViewProps } from 'react-native';

import * as React from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  FadeInDown,
  SlideInLeft,
  SlideOutLeft,
} from 'react-native-reanimated';

import { isEmpty } from 'lodash';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';

import { styled } from '@app/lib/styled';
import { Button } from '@app/components/button';
import { vibrate } from '@app/lib/haptic.feedback';
import { FlightCard } from '@app/components/flight.card';
import { FaIcon } from '@app/components/icons.fontawesome';
import { usePrompt } from '@app/components/prompt/use.prompt';
import { PageContainer } from '@app/components/page.container';
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
  const scroll = React.useRef<ScrollView>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);
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

  const handleScroll: ScrollViewProps['onScroll'] = (event) => {
    if (event.nativeEvent.contentOffset.y > WINDOW_HEIGHT && !showScrollTop) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
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
          onScroll={handleScroll}
          ref={scroll}
          refreshControl={
            <RefreshControl
              onRefresh={() => flights.refetch()}
              refreshing={false}
            />
          }
          scrollEventThrottle={16}
          showsVerticalScrollIndicator
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
                  icon="rectangle-history"
                  disabled={!hasArchivedFlights}
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
            {showScrollTop && (
              <ScrollTop>
                <ScrollTopBtn onPress={handleScrollTop}>
                  <FaIcon name="arrow-up-to-line" size={25} />
                </ScrollTopBtn>
              </ScrollTop>
            )}
          </Content>
        </ScrollView>
        <Footer>
          <BottomTabs />
          <AddFlightBtn />
        </Footer>
      </Page>
    </PageContainer>
  );
};

const Page = styled(View, (theme) => [
  {
    backgroundColor: theme.pallette.background,
    flexGrow: 1,
  },
]);

const Header = styled(View, (theme) => [
  {
    paddingBottom: theme.space.small,
    paddingHorizontal: theme.space.large,
    paddingTop: theme.insets.top,
  },
]);

const ListHeader = styled(View, (theme) => [
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space.medium,
  },
]);

const ListActions = styled(View, () => [{}]);

const Title = styled(Text, (theme) => [theme.typography.presets.massive]);

const Item = styled(
  Animated.createAnimatedComponent(TouchableOpacity),
  (theme) => [
    {
      paddingHorizontal: theme.space.medium,
      paddingVertical: theme.space.medium / 2,
    },
  ],
);

const ItemActions = styled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.background,
    padding: theme.space.large,
    zIndex: 1,
  },
]);

const List = styled(View, () => []);

const Content = styled(View, (theme) => [
  {
    gap: theme.space.medium,
  },
]);

const ArchivedFlightsBtn = styled(Button, (_, props) => [
  {
    opacity: props.disabled ? 0 : 1,
  },
]);

const DeleteFlightBtn = styled(TouchableOpacity, () => []);

const DeleteFlightBtnText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.danger,
    fontWeight: 'bold',
  },
]);

const ScrollTop = styled(View, (theme) => [theme.presets.centered]);
const ScrollTopBtn = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    borderColor: theme.pallette.grey[50],
    borderRadius: theme.roundRadius,
    borderWidth: theme.borderWidth,
    width: 50,
  },
]);

const Footer = styled(
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
