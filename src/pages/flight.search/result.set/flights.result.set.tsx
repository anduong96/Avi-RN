import * as React from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '@app/navigation';
import type { FindFlightsQuery } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useFindFlightsQuery } from '@app/generated/server.gql';
import { FlightCardCompact } from '@app/components/flight.card.compact';

import { useValue } from '../state/use.value';

export const FlightsResultSet: React.FC = () => {
  const navigation = useNavigation<MainStack<'FlightSearch'>>();
  const airlineIata = useValue('airlineIata')!;
  const flightNumber = useValue('flightNumber')!;
  const departureDate = useValue('departureDate')!;
  const result = useFindFlightsQuery({
    variables: {
      airlineIata,
      date: departureDate.getDate(),
      flightNumber,
      month: departureDate.getMonth(),
      year: departureDate.getFullYear(),
    },
  });

  const handlePress = (item: FindFlightsQuery['flights'][number]) => {
    vibrate('impactLight');
    navigation.push('FlightStack', {
      params: {
        flightID: item.id,
        isFromSearch: true,
      },
      screen: 'Flight',
    });
  };

  return (
    <FlatList
      ListEmptyComponent={() =>
        result.called &&
        !result.loading &&
        !result.data?.flights.length && (
          <Empty>
            <EmptyText>No flights found</EmptyText>
          </Empty>
        )
      }
      data={result.data?.flights}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl onRefresh={() => result.refetch()} refreshing={false} />
      }
      renderItem={({ item }) => (
        <Item onPress={() => handlePress(item)}>
          <FlightCardCompact flight={item} />
        </Item>
      )}
    />
  );
};

const Empty = withStyled(View, (theme) => [
  theme.presets.centered,
  theme.presets.shadows[100],
  {
    backgroundColor: theme.pallette.grey[100],
    borderRadius: theme.borderRadius,
    margin: theme.space.medium,
    padding: theme.space.large,
  },
]);

const EmptyText = withStyled(Text, (theme) => [
  theme.typography.presets.h4,
  {
    fontWeight: 'bold',
  },
]);

const Item = withStyled(TouchableOpacity, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
  },
]);
