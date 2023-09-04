import * as React from 'react';

import { FlatList, RefreshControl, View } from 'react-native';

import { FlightCard } from '@app/components/flight.card';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { styled } from '@app/lib/styled';
import { useGetUserArchivedFlightsQuery } from '@app/generated/server.gql';

export const ArchivedFlightsPage: React.FC = () => {
  const response = useGetUserArchivedFlightsQuery({
    fetchPolicy: 'cache-first',
  });

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
