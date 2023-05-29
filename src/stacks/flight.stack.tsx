import * as React from 'react';

import { FlightPage } from '@app/pages/flight';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type FlightStackParams = {
  Flight: undefined;
};

const Stack = createNativeStackNavigator<FlightStackParams>();

export const FlightStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Flight" component={FlightPage} />
    </Stack.Navigator>
  );
};
