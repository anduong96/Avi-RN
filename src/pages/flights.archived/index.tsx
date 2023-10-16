import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';

import { styled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { CloseBtn } from '@app/components/btn.close';
import { FlightCard } from '@app/components/flight.card';
import { PageHeader } from '@app/components/page.header';
import { PageContainer } from '@app/components/page.container';
import { useRootNavigation } from '@app/navigation/use.root.navigation';
import { useGetUserArchivedFlightsQuery } from '@app/generated/server.gql';

export const ArchivedFlightsPage: React.FC = () => {
  const rootNavigation = useRootNavigation();
  const response = useGetUserArchivedFlightsQuery({
    fetchPolicy: 'cache-first',
  });

  const handlePress = (flightID: string) => {
    vibrate('effectClick');
    rootNavigation.push('FlightStack', {
      params: {
        flightID,
      },
      screen: 'Flight',
    });
  };

  return (
    <PageContainer>
      <PageHeader
        rightActions={<CloseBtn />}
        title={'Archived Flights'}
        withoutInsets
      />
      <FlatList
        data={response.data?.userArchivedFlights}
        keyExtractor={(item) => item.id}
        renderItem={(entry) => {
          return (
            <ListItem
              entering={
                entry.index < 10
                  ? SlideInLeft.delay(entry.index * 100)
                  : undefined
              }
            >
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

const ListItem = styled(Animated.View, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.medium / 2,
  },
]);
