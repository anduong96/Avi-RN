import * as React from 'react';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  GetUserFlightsDocument,
  useAddUserFlightMutation,
  useGetFlightQuery,
} from '@app/generated/server.gql';
import { Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ConfirmDisplay } from './confirm.display';
import { FlightPageDistanceSeparator } from '@app/components/flight.page/distance.separator';
import { FlightPageLocationSection } from '@app/components/flight.page/location.section';
import { FlightPageTopHeader } from '@app/components/flight.page/top.header';
import type { FlightSearchStackParams } from '@app/stacks/flight.search.stack';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { MaterialIcon } from '@app/components/icons.material';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import type { RouteProp } from '@react-navigation/native';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightSearchStackParams, 'Confirm'>;
type Route = RouteProp<FlightSearchStackParams, 'Confirm'>;

const SWIPE_CONFIRM_THRESHOLD = 100;
export const FlightSearchConfirmPage: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();
  const theme = useTheme();
  const flightID = route.params.flightID;
  const swipeY = useSharedValue(0);
  const [addFlight] = useAddUserFlightMutation({
    refetchQueries: [
      {
        query: GetUserFlightsDocument,
      },
    ],
  });
  const [isConfirming, setIsConfirming] = React.useState(false);
  const isConfirmingDerived = useDerivedValue(
    () => isConfirming,
    [isConfirming],
  );
  const { data, loading } = useGetFlightQuery({
    variables: {
      flightID,
    },
  });
  const flight = data?.flight;
  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: swipeY.value,
      },
    ],
  }));

  const swipeAreaStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isConfirmingDerived.value ? 0 : 1),
  }));

  const handleBack = () => {
    vibrate('impactMedium');
    navigation.goBack();
  };

  React.useEffect(() => {
    if (isConfirming) {
      addFlight({
        variables: {
          flightID,
        },
      });
    }
  }, [isConfirming, flightID, addFlight]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingOverlay />
      </PageContainer>
    );
  } else if (!flight) {
    return (
      <PageContainer>
        <PageHeader withBack onPressBack={handleBack} title="Confirm" />
      </PageContainer>
    );
  }

  const swipeUpGesture = Gesture.Pan()
    .onBegin(() => {
      vibrate('impactMedium');
    })
    .onUpdate((e) => {
      const nextY = Math.min(e.translationY, 0);
      if (nextY * -1 >= SWIPE_CONFIRM_THRESHOLD) {
        swipeY.value = withTiming(SCREEN_HEIGHT * -1);
        setIsConfirming(true);
      } else {
        swipeY.value = nextY;
      }
    })
    .onEnd((e) => {
      const nextY = Math.min(e.translationY, 0);
      if (!isConfirming && nextY < SWIPE_CONFIRM_THRESHOLD) {
        swipeY.value = withTiming(0);
      }
    })
    .runOnJS(true);

  return (
    <PageContainer>
      <Background>
        {isConfirming && <ConfirmDisplay />}
        <Content style={[contentStyle]}>
          <PageHeader
            withBack
            onPressBack={handleBack}
            align="center"
            title={<FlightPageTopHeader flight={flight} />}
          />
          <FlightMeta>
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
          </FlightMeta>
        </Content>
        <GestureDetector gesture={swipeUpGesture}>
          <SwipeArea style={[swipeAreaStyle]}>
            <MaterialIcon
              name="chevron-double-up"
              color={theme.pallette.active}
              size={30}
            />
            <SwipeText>Swipe up to save</SwipeText>
          </SwipeArea>
        </GestureDetector>
      </Background>
    </PageContainer>
  );
};

const Content = styled(Animated.View, (theme) => [
  {
    backgroundColor: theme.pallette.background,
    flexGrow: 1,
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
  },
]);

const SwipeArea = styled(Animated.View, (theme) => [
  theme.presets.centered,
  {
    padding: theme.space.medium,
    paddingBottom: theme.insets.bottom || theme.space.medium,
    gap: theme.space.small,
  },
]);

const SwipeText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
]);

const FlightMeta = styled(View, (theme) => [
  theme.presets.shadows[100],
  {
    padding: theme.space.medium,
    gap: theme.space.large,
    backgroundColor: theme.pallette.background,
    borderRadius: theme.borderRadius,
    margin: theme.space.medium,
  },
]);

const Background = styled(View, (theme) => [
  {
    backgroundColor: theme.pallette.black,
    height: '100%',
  },
]);
