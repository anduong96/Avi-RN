import * as React from 'react';

import { FlatList, RefreshControl, View } from 'react-native';
import {
  FlightStatus,
  useGetUserFlightsQuery,
} from '@app/generated/server.gql';

import { FlightCard } from '@app/components/flight.card';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { size } from 'lodash';
import { styled } from '@app/lib/styled';

export const ArchivedFlightsPage: React.FC = () => {
  const response = useGetUserFlightsQuery({
    fetchPolicy: 'cache-first',
  });
  const data = response.data?.userFlights.filter(
    (entry) => entry.flight.status === FlightStatus.ARCHIVED,
  );

  return (
    <PageContainer>
      <PageHeader withoutInsets title={`Archived Flights (${size(data)})`} />
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
