import { FlightCardCompact } from '@app/components/flight.card.compact';
import type { FindFlightsQuery } from '@app/generated/server.gql';
import { useFindFlightsQuery } from '@app/generated/server.gql';
import * as React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useValue } from '../state/use.value';
import { styled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useNavigation } from '@react-navigation/native';
import type { MainStack } from '@app/stacks';

export const FlightsResultSet: React.FC = () => {
  const navigation = useNavigation<MainStack<'FlightSearch'>>();
  const airlineIata = useValue('airlineIata')!;
  const flightNumber = useValue('flightNumber')!;
  const departureDate = useValue('departureDate')!;
  const result = useFindFlightsQuery({
    variables: {
      airlineIata,
      flightNumber,
      year: departureDate.getFullYear(),
      month: departureDate.getMonth(),
      date: departureDate.getDate(),
    },
  });

  const handlePress = (item: FindFlightsQuery['flights'][number]) => {
    vibrate('impactLight');
    navigation.push('FlightStack', {
      screen: 'Flight',
      params: {
        flightID: item.id,
        isFromSearch: true,
      },
    });
  };

  return (
    <FlatList
      data={result.data?.flights}
      keyExtractor={(item) => item.id}
      refreshing={result.loading}
      onRefresh={() => result.refetch()}
      style={{ flexGrow: 1 }}
      ListEmptyComponent={() =>
        result.called &&
        !result.loading &&
        !result.data?.flights.length && (
          <Empty>
            <EmptyText>No flights found</EmptyText>
          </Empty>
        )
      }
      renderItem={({ item }) => (
        <Item onPress={() => handlePress(item)}>
          <FlightCardCompact flight={item} />
        </Item>
      )}
    />
  );
};

const Empty = styled(View, (theme) => [
  theme.presets.centered,
  theme.presets.shadows[100],
  {
    padding: theme.space.large,
    backgroundColor: theme.pallette.grey[100],
    margin: theme.space.medium,
    borderRadius: theme.borderRadius,
  },
]);

const EmptyText = styled(Text, (theme) => [
  theme.typography.presets.h4,
  {
    fontWeight: 'bold',
  },
]);

const Item = styled(TouchableOpacity, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
  },
]);
