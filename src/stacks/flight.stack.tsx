import * as React from 'react';

import { ArchivedFlightsPage } from '@app/pages/flights.archived';
import { FlightPage } from '@app/pages/flight';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type FlightStackParams = {
  Archived: undefined;
  Flight: {
    flightID: string;
    isFromSearch?: boolean;
  };
};

const Stack = createNativeStackNavigator<FlightStackParams>();

export const FlightStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="Archived" component={ArchivedFlightsPage} />
      <Stack.Screen name="Flight" component={FlightPage} />
    </Stack.Navigator>
  );
};
