import * as React from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import { ActivityIndicator, FlatList, Pressable } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
} from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '@app/navigation';
import type { FindFlightsQuery } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { Result } from '@app/components/result';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { FlightCardCompact } from '@app/components/flight.card.compact';
import { useFindFlightsWithAirportsQuery } from '@app/generated/server.gql';

import { useFlightSearchState } from '../state';

export const FlightsWithAirportResultSet: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<MainStack>();
  const airlineIata = useFlightSearchState((s) => s.airlineIata!);
  const departureDate = useFlightSearchState((s) => s.departureDate!);
  const originIata = useFlightSearchState((s) => s.originIata!);
  const destinationIata = useFlightSearchState((s) => s.destinationIata!);
  const date = departureDate.getDate();
  const month = departureDate.getMonth();
  const year = departureDate.getFullYear();
  const result = useFindFlightsWithAirportsQuery({
    variables: {
      airlineIata,
      date,
      destinationIata,
      month,
      originIata,
      year,
    },
  });
  const flights = result.data?.flightsWithAirports || [];
  const isLoading = result.loading;
  const hasFlights = flights.length > 0;

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
      ListEmptyComponent={() => {
        if (isLoading && !hasFlights) {
          return (
            <Animated.View
              entering={FadeInDown.delay(2 * 1000)}
              exiting={FadeOutDown}
            >
              <Result
                hero={
                  <ActivityIndicator color={theme.pallette.text} size="large" />
                }
                title="Loading..."
              />
            </Animated.View>
          );
        }

        if (result.called && !isLoading && !hasFlights) {
          return (
            <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
              <Result
                hero={<Typography type="massive">😐</Typography>}
                subtitle="Try a different date or flight number"
                title="No result(s)"
              />
            </Animated.View>
          );
        }
      }}
      data={flights}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl onRefresh={() => result.refetch()} refreshing={false} />
      }
      renderItem={({ index, item }) => (
        <Item onPress={() => handlePress(item)}>
          <Animated.View entering={FadeInLeft.delay(index * 50).duration(300)}>
            <FlightCardCompact flight={item} />
          </Animated.View>
        </Item>
      )}
    />
  );
};

const Item = withStyled(Pressable, (theme) => [
  {
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.medium / 2,
  },
]);
