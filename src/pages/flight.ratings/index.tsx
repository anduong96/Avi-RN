import * as React from 'react';

import { ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import type { FlightStackParams } from '@app/stacks/flight.stack';
import { LoadingContainer } from '@app/components/loading.container';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import type { RouteProp } from '@react-navigation/native';
import { styled } from '@app/lib/styled';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';

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
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <PageHeader
          withBack
          withoutInsets
          onPressBack={handleBack}
          title={
            flight.data &&
            `${flight.data.flight.airlineIata}${flight.data.flight.flightNumber} Ratings`
          }
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
