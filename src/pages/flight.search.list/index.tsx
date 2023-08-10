import * as React from 'react';

import { FlatList, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { FlightCardCompact } from '@app/components/flight.card.compact';
import { FlightPageTopHeader } from '@app/components/flight.page/top.header';
import type { FlightSearchStackParams } from '@app/stacks/flight.search.stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import type { RouteProp } from '@react-navigation/native';
import { SpaceVertical } from '@app/components/space.vertical';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import pluralize from 'pluralize';
import { size } from 'lodash';
import { styled } from '@app/lib/styled';
import { useFindFlightsQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightSearchStackParams, 'List'>;
type Route = RouteProp<FlightSearchStackParams, 'List'>;

export const FlightSearchListPage: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();
  const response = useFindFlightsQuery({
    variables: {
      airlineIata: route.params.airlineIata,
      flightNumber: route.params.flightNumber,
      departureDate: new Date(route.params.departureDate),
    },
  });

  const flights = response.data?.findFlights;
  const count = size(flights);

  const handleBack = () => {
    vibrate('impactMedium');
    navigation.goBack();
  };

  const handleFlightPress = (flightID: string) => {
    navigation.push('Confirm', {
      flightID,
    });
  };

  if (!flights) {
    return <PageContainer />;
  }

  return (
    <PageContainer>
      <PageHeader
        withBack
        onPressBack={handleBack}
        align="center"
        title={<FlightPageTopHeader flight={flights[0]} />}
      />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={flights}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <SpaceVertical size="medium" />}
        renderItem={({ item: flight }) => {
          return (
            <ListItem>
              <FlightCardCompact
                flight={flight}
                onPress={() => handleFlightPress(flight.id)}
              />
            </ListItem>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <Header>
              <Title>{count}</Title>
              <Subtitle>{pluralize('flight', count, false)} found</Subtitle>
            </Header>
          );
        }}
        ListFooterComponent={() => <ListFooter />}
      />
    </PageContainer>
  );
};

const Header = styled(View, (theme) => [
  theme.presets.centered,
  {
    minHeight: WINDOW_HEIGHT / 3,
  },
]);

const Title = styled(Text, (theme) => [
  theme.typography.presets.massive,
  {
    color: theme.typography.color,
    fontWeight: 'bold',
  },
]);

const Subtitle = styled(Text, (theme) => [
  theme.typography.presets.h3,
  {
    color: theme.typography.color,
  },
]);

const ListItem = styled(View, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
  },
]);

const ListFooter = styled(View, (theme) => [
  {
    height: theme.insets.bottom,
  },
]);
