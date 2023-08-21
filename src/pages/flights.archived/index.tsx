import * as React from 'react';

import { FlatList, RefreshControl, View } from 'react-native';
import {
  FlightStatus,
  useGetUserFlightsQuery,
} from '@app/generated/server.gql';

import { FlightCard } from '@app/components/flight.card';
import type { MainStackParam } from '@app/stacks';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { size } from 'lodash';
import { styled } from '@app/lib/styled';
import { useNavigation } from '@react-navigation/native';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<MainStackParam, 'ArchivedFlights'>;

export const ArchivedFlightsPage: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const response = useGetUserFlightsQuery({
    fetchPolicy: 'cache-first',
  });
  const data = response.data?.userFlights.filter(
    (entry) => entry.flight.status === FlightStatus.ARCHIVED,
  );

  const handleExit = () => {
    vibrate('impactMedium');
    navigation.goBack();
  };

  return (
    <PageContainer>
      <PageHeader
        withBack
        title={`Archived Flights (${size(data)})`}
        onPressBack={handleExit}
      />
      <FlatList
        data={data}
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
              <FlightCard value={entry.item} />
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
