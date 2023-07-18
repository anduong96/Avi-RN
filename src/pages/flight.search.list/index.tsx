import * as React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import type { FlightSearchStackParams } from '@app/stacks/flight.search.stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import type { RouteProp } from '@react-navigation/native';
import { useFindFlightsQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightSearchStackParams, 'List'>;
type Route = RouteProp<FlightSearchStackParams, 'List'>;

export const FlightSearchListPage: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();
  const data = useFindFlightsQuery({
    variables: {
      airlineIata: route.params.airlineIata,
      flightNumber: route.params.flightNumber,
      departureDate: new Date(route.params.departureDate),
    },
  });

  const handleBack = () => {
    vibrate('impactMedium');
    navigation.goBack();
  };

  return (
    <PageContainer>
      <PageHeader withBack onPressBack={handleBack} title={'List'} />
    </PageContainer>
  );
};
