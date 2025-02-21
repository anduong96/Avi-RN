import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { NavigationStack } from '@app/types/navigation';

import { FlightPage } from '@app/pages/flight';
import { FlightTSAPage } from '@app/pages/flight.tsa';
import { FlightCoursePage } from '@app/pages/flight.course';
import { FlightRatingsPage } from '@app/pages/flight.ratings';

export type FlightStackParams = {
  Course: {
    flightID: string;
  };
  Flight: {
    flightID: string;
    isFromSearch?: boolean;
  };
  Ratings: {
    flightID: string;
  };
  TSA: {
    flightID: string;
  };
};

export type FlightStack = NavigationStack<FlightStackParams>;

const Stack = createNativeStackNavigator<FlightStackParams>();

export const FlightStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen component={FlightPage} name="Flight" />
      <Stack.Screen component={FlightCoursePage} name="Course" />
      <Stack.Screen component={FlightRatingsPage} name="Ratings" />
      <Stack.Screen component={FlightTSAPage} name="TSA" />
    </Stack.Navigator>
  );
};
