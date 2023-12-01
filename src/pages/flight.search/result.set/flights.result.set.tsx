import * as React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '@app/navigation';
import type { FindFlightsQuery } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { Typography } from '@app/components/typography';
import { useFindFlightsQuery } from '@app/generated/server.gql';
import { FlightCardCompact } from '@app/components/flight.card.compact';

import { useFlightSearchState } from '../state';

export const FlightsResultSet: React.FC = () => {
  const navigation = useNavigation<MainStack>();
  const airlineIata = useFlightSearchState((s) => s.airlineIata!);
  const flightNumber = useFlightSearchState((s) => s.flightNumber!);
  const departureDate = useFlightSearchState((s) => s.departureDate!);
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
            <Typography isBold type="h4">
              No flight(s) found
            </Typography>
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
  {
    backgroundColor: theme.pallette.grey[50],
    borderRadius: theme.borderRadius,
    margin: theme.space.medium,
    padding: theme.space.large,
  },
]);

const Item = withStyled(Pressable, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.medium / 2,
  },
]);
