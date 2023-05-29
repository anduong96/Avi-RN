import * as React from 'react';

import {
  ActionButton,
  Actions,
  Container,
  Header,
  ListItem,
  Meta,
  SearchBtn,
  SearchContainer,
  SearchPlaceholderText,
  Title,
} from './styles';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import type { MainStackParam } from '@app/stacks';
import { MaterialIcon } from '@app/components/icons.material';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { faker } from '@faker-js/faker';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<MainStackParam, 'Home'>;

const data = Array.from({ length: 3 }).map(() => ({
  id: faker.string.uuid(),
  origin: {
    ...faker.airline.airport(),
    time: faker.date.future(),
  },
  destination: {
    ...faker.airline.airport(),
    time: faker.date.future(),
  },
}));

export const HomePage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const snapPoints = React.useMemo(
    () => [Math.min(WINDOW_HEIGHT / 2 + 100, 500), WINDOW_HEIGHT - insets.top],
    [insets],
  );

  const handleSearchFlights = () => {
    vibrate('impactMedium');
    navigation.push('FlightSearchStack', {
      screen: 'Airline',
    });
  };

  const handleOpenSettings = () => {
    vibrate('impactMedium');
    navigation.push('Settings');
  };

  const handleOpenProfile = () => {
    vibrate('impactMedium');
    navigation.push('Profile');
  };

  const handleOpenFlight = () => {
    vibrate('impactMedium');
    navigation.push('FlightStack', {
      screen: 'Flight',
    });
  };

  return (
    <PageContainer>
      <Container>
        <BottomSheet
          index={0}
          handleIndicatorStyle={{ opacity: 0 }}
          snapPoints={snapPoints}
        >
          <BottomSheetFlatList
            ListHeaderComponent={
              <Header>
                <Meta>
                  <Title>Flights</Title>
                  <Actions>
                    <ActionButton onPress={handleOpenProfile}>
                      <MaterialIcon name="badge-account" />
                    </ActionButton>
                    <ActionButton onPress={handleOpenSettings}>
                      <MaterialIcon name="cog" />
                    </ActionButton>
                  </Actions>
                </Meta>
                <SearchContainer>
                  <SearchBtn onPress={handleSearchFlights}>
                    <MaterialIcon name="magnify" />
                    <SearchPlaceholderText>Find Flights</SearchPlaceholderText>
                  </SearchBtn>
                </SearchContainer>
              </Header>
            }
            data={data}
            stickyHeaderIndices={[0]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem onPress={() => handleOpenFlight()}>
                {/* <FlightCard
                  origin={{
                    airportIata: flight.originIata,
                    timezone: flight.departureTimezone,
                    date: flight.departureAt,
                  }}
                  destination={{
                    airportIata: flight.originIata,
                    timezone: flight.departureTimezone,
                    date: flight.departureAt,
                  }}
                /> */}
              </ListItem>
            )}
          />
        </BottomSheet>
      </Container>
    </PageContainer>
  );
};
