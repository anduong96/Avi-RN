import * as React from 'react';

import { FlightSearchListPage } from '@app/pages/flight.search.list';
import { FlightSearchPage } from '@app/pages/flight.search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type FlightSearchStackParams = {
  Search: {
    airlineIata?: string;
    flightNumber?: string;
    year?: number;
    month?: number;
    date?: number;
  };
  List: {
    airlineIata: string;
    flightNumber: string;
    year: number;
    month: number;
    date: number;
  };
};

const Stack = createNativeStackNavigator<FlightSearchStackParams>();

export const FlightSearchStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={FlightSearchPage} />
      <Stack.Screen name="List" component={FlightSearchListPage} />
    </Stack.Navigator>
  );
};
