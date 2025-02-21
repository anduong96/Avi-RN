import * as React from 'react';
import { Pressable } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';

import { FlashList } from '@shopify/flash-list';

import { logger } from '@app/lib/logger';
import { format } from '@app/lib/format';
import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { FlightCard } from '@app/components/flight.card';
import { ModalHeader } from '@app/components/modal.header';
import { PageContainer } from '@app/components/page.container';
import { useRootNavigation } from '@app/navigation/use.root.navigation';
import { useUserArchivedFlightsQuery } from '@app/generated/server.gql';

export const ArchivedFlightsPage: React.FC = () => {
  const rootNavigation = useRootNavigation();
  const response = useUserArchivedFlightsQuery({
    fetchPolicy: 'cache-first',
  });

  const handlePress = (flightID: string) => {
    vibrate('effectClick');
    logger.debug(format('ArchivedFlightsPage: pressed flightID=%s', flightID));
    rootNavigation.push('FlightStack', {
      params: {
        flightID,
      },
      screen: 'Flight',
    });
  };

  return (
    <PageContainer>
      <ModalHeader title={'Archived Flights'} withClose />
      <FlashList
        data={response.data?.userArchivedFlights ?? []}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id}
        onRefresh={() => response.refetch()}
        refreshing={response.loading}
        renderItem={(entry) => {
          return (
            <Pressable onPress={() => handlePress(entry.item.flightID)}>
              <ListItem
                entering={
                  entry.index < 10
                    ? SlideInLeft.delay(entry.index * 100)
                    : undefined
                }
              >
                <FlightCard value={entry.item} />
              </ListItem>
            </Pressable>
          );
        }}
      />
    </PageContainer>
  );
};

const ListItem = withStyled(Animated.View, (theme) => [
  {
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.medium / 2,
  },
]);
