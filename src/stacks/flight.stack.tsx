import * as React from 'react';

import { ArchivedFlightsPage } from '@app/pages/flights.archived';
import { FlightCoursePage } from '@app/pages/flight.course';
import { FlightPage } from '@app/pages/flight';
import { FlightRatingsPage } from '@app/pages/flight.ratings';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type FlightStackParams = {
  Archived: undefined;
  Flight: {
    flightID: string;
    isFromSearch?: boolean;
  };
  Ratings: {
    flightID: string;
  };
  Course: {
    flightID: string;
  };
};

export type FlightStack<K extends keyof FlightStackParams> =
  NativeStackNavigationProp<FlightStackParams, K>;

const Stack = createNativeStackNavigator<FlightStackParams>();

export const FlightStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Archived"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Archived" component={ArchivedFlightsPage} />
      <Stack.Screen name="Flight" component={FlightPage} />
      <Stack.Screen name="Course" component={FlightCoursePage} />
      <Stack.Screen name="Ratings" component={FlightRatingsPage} />
    </Stack.Navigator>
  );
};
