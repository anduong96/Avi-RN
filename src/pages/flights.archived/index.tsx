import * as React from 'react';

import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';

import { FlightCard } from '@app/components/flight.card';
import type { FlightStackParams } from '@app/stacks/flight.stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { styled } from '@app/lib/styled';
import { useGetUserArchivedFlightsQuery } from '@app/generated/server.gql';
import { useNavigation } from '@react-navigation/native';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightStackParams, 'Archived'>;

export const ArchivedFlightsPage: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const response = useGetUserArchivedFlightsQuery({
    fetchPolicy: 'cache-first',
  });

  const handlePress = (flightID: string) => {
    vibrate('effectClick');
    navigation.push('Flight', {
      flightID,
    });
  };

  return (
    <PageContainer>
      <PageHeader withoutInsets title={'Archived Flights'} />
      <FlatList
        data={response.data?.userArchivedFlights}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={response.loading}
            onRefresh={() => response.refetch()}
          />
        }
        renderItem={(entry) => {
          return (
            <ListItem>
              <TouchableOpacity
                onPress={() => handlePress(entry.item.flightID)}
              >
                <FlightCard value={entry.item} />
              </TouchableOpacity>
            </ListItem>
          );
        }}
      />
    </PageContainer>
  );
};

const ListItem = styled(View, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.medium / 2,
  },
]);
