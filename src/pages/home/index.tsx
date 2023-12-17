import * as React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutLeft,
} from 'react-native-reanimated';

import { isEmpty, size } from 'lodash';
import { FlashList } from '@shopify/flash-list';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';

import type { UserActiveFlightsQuery } from '@app/generated/server.gql';

import { logger } from '@app/lib/logger';
import { format } from '@app/lib/format';
import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { Button } from '@app/components/button';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ScrollUp } from '@app/components/scroll.up';
import { FlightCard } from '@app/components/flight.card';
import { usePrompt } from '@app/components/prompt/use.prompt';
import { PageContainer } from '@app/components/page.container';
import { SpaceVertical } from '@app/components/space.vertical';
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
import { EmptyFlights } from './empty.flights';
import { AddFlightBtn } from './add.flight.btn';

export const HomePage: React.FC = () => {
  const prompt = usePrompt();
  const theme = useTheme();
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
          ListEmptyComponent={() => {
            if (isEmpty(activeFlights) && flights.loading) {
              return (
                <Animated.View
                  entering={FadeInDown.delay(5 * 1000)}
                  exiting={FadeOutDown}
                >
                  <Group
                    flexGrow={1}
                    gap={'large'}
                    isCentered
                    paddingVertical={'large'}
                  >
                    <SpaceVertical size="large" />
                    <ActivityIndicator
                      color={theme.pallette.text}
                      size="large"
                    />
                  </Group>
                </Animated.View>
              );
            }

            return null;
          }}
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
              <Group gap={'large'}>
                <Header>
                  <Title>Your</Title>
                  <Title>Flights ✈️</Title>
                </Header>
                <Actions>
                  <ArchivedFlightsBtn
                    disabled={!hasArchivedFlights}
                    icon="rectangle-history"
                    isLoading={archived.loading}
                    onPress={handleOpenArchivedFlights}
                  >
                    Past
                  </ArchivedFlightsBtn>
                </Actions>
              </Group>
            );
          }}
          contentContainerStyle={{
            paddingBottom: size(activeFlights) > 1 ? WINDOW_HEIGHT * 0.5 : 0,
          }}
          data={activeFlights}
          estimatedItemSize={200}
          onScroll={scrollPosition.handleScroll}
          ref={scroll}
          refreshControl={
            <RefreshControl
              onRefresh={() => flights.refetch()}
              refreshing={false}
            />
          }
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
                  entering={FadeInLeft.delay(index * 50).duration(300)}
                  exiting={FadeOutLeft}
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
          {isEmpty(activeFlights) && !flights.loading && <EmptyFlights />}

          <Group
            direction="row"
            paddingHorizontal={'medium'}
            style={{ justifyContent: 'space-between' }}
            verticalAlign="center"
          >
            <BottomTabs />
            <AddFlightBtn />
          </Group>
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
      paddingHorizontal: theme.space.small,
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
      bottom: theme.insets.bottom || theme.space.large,
      gap: theme.space.medium,
      left: 0,
      position: 'absolute',
      right: 0,
    },
  ],
  {
    entering: FadeInDown,
  },
);
