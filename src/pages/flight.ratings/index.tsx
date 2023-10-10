import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import type { FlightStackParams } from '@app/navigation/flight.stack';

import { styled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { PageHeader } from '@app/components/page.header';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { PageContainer } from '@app/components/page.container';
import { LoadingContainer } from '@app/components/loading.container';

type Navigation = NativeStackNavigationProp<FlightStackParams, 'Ratings'>;
type Route = RouteProp<FlightStackParams, 'Ratings'>;

export const FlightRatingsPage: React.FC = () => {
  const route = useRoute<Route>();
  const navigation = useNavigation<Navigation>();
  const flightID = route.params.flightID;
  const flight = useGetFlightQuery({
    fetchPolicy: 'cache-first',
    variables: {
      flightID,
    },
  });

  const handleBack = () => {
    vibrate('effectClick');
    navigation.goBack();
  };

  return (
    <PageContainer>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={[0]}
      >
        <PageHeader
          onPressBack={handleBack}
          title={
            flight.data &&
            `${flight.data.flight.airlineIata}${flight.data.flight.flightNumber} Ratings`
          }
          withBack
          withoutInsets
        />
        <Content>
          <LoadingContainer>
            {() => {
              return <View />;
            }}
          </LoadingContainer>
        </Content>
      </ScrollView>
    </PageContainer>
  );
};

const Content = styled(View, () => [
  {
    flexGrow: 1,
  },
]);
