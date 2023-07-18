import * as React from 'react';

import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { FlightPageDistanceSeparator } from '@app/components/flight.page/distance.separator';
import { FlightPageLocationSection } from '@app/components/flight.page/location.section';
import { FlightPageTopHeader } from '@app/components/flight.page/top.header';
import type { FlightStackParams } from '@app/stacks/flight.stack';
import { MaterialIcon } from '@app/components/icons.material';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import type { RouteProp } from '@react-navigation/native';
import { styled } from '@app/lib/styled';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightStackParams, 'Flight'>;
type Route = RouteProp<FlightStackParams, 'Flight'>;

export const FlightPage: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();
  const flightID = route.params.flightID;
  const { data, loading, refetch } = useGetFlightQuery({
    variables: {
      flightID,
    },
  });
  const flight = data?.flight;

  const handleClose = () => {
    vibrate('impactMedium');
    navigation.goBack();
  };

  return (
    <PageContainer>
      <PageHeader
        withoutInsets
        withBack
        onPressBack={handleClose}
        align="center"
        title={<>{flight && <FlightPageTopHeader flight={flight} />}</>}
        rightActions={
          <MenuBtn>
            <MaterialIcon name="dots-vertical" color={theme.pallette.active} />
          </MenuBtn>
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
        }
      >
        {flight && (
          <Content>
            <Meta>
              <FlightPageLocationSection
                type="origin"
                airport={flight.origin}
                timezone={flight.originTimezone}
                airportIata={flight.originIata}
                terminal={flight.originTerminal}
                gate={flight.originGate}
                estimatedMovementTime={flight.estimatedGateDeparture}
                scheduledMovementTime={flight.scheduledGateDeparture}
                actualMovementTime={flight.actualGateDeparture}
              />
              <FlightPageDistanceSeparator
                duration={flight.actualDuration ?? flight.estimatedDuration}
              />
              <FlightPageLocationSection
                type="destination"
                airport={flight.destination}
                timezone={flight.destinationTimezone}
                airportIata={flight.destinationIata}
                terminal={flight.destinationTerminal}
                gate={flight.destinationGate}
                estimatedMovementTime={flight.estimatedGateArrival}
                scheduledMovementTime={flight.scheduledGateArrival}
                actualMovementTime={flight.actualGateArrival}
              />
            </Meta>
          </Content>
        )}
      </ScrollView>
    </PageContainer>
  );
};

const Content = styled(View, (theme) => [
  {
    padding: theme.space.medium,
    gap: theme.space.xlarge,
  },
]);

const Meta = styled(View, (theme) => [
  theme.presets.shadows[100],
  {
    gap: theme.space.large,
    backgroundColor: theme.pallette.background,
    padding: theme.space.medium,
    borderRadius: theme.borderRadius,
  },
]);

const MenuBtn = styled(TouchableOpacity, (theme) => [
  {
    paddingRight: theme.space.medium,
  },
]);
