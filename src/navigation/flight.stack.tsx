import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FlightPage } from '@app/pages/flight';
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
};

export type FlightStack<K extends keyof FlightStackParams> =
  NativeStackNavigationProp<FlightStackParams, K>;

const Stack = createNativeStackNavigator<FlightStackParams>();

export const FlightStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={FlightPage} name="Flight" />
      <Stack.Screen component={FlightCoursePage} name="Course" />
      <Stack.Screen component={FlightRatingsPage} name="Ratings" />
    </Stack.Navigator>
  );
};
