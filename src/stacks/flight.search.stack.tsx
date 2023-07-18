import * as React from 'react';

import { FlightSearchConfirmPage } from '@app/pages/flight.search.confirm';
import { FlightSearchListPage } from '@app/pages/flight.search.list';
import { FlightSearchPage } from '@app/pages/flight.search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type FlightSearchStackParams = {
  Search: {
    airlineIata?: string;
    flightNumber?: string;
    departureDate?: string;
  };
  List: {
    airlineIata: string;
    flightNumber: string;
    departureDate: string;
  };
  Confirm: {
    flightID: string;
  };
};

const Stack = createNativeStackNavigator<FlightSearchStackParams>();

export const FlightSearchStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={FlightSearchPage} />
      <Stack.Screen name="List" component={FlightSearchListPage} />
      <Stack.Screen name="Confirm" component={FlightSearchConfirmPage} />
    </Stack.Navigator>
  );
};
