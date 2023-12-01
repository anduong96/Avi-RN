import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { NavigationStack } from '@app/types/navigation';

import { AirportWeatherPage } from '@app/pages/airport.weather';

export type AirportStackParams = {
  Weather: {
    airportIata: string;
    date: number;
    hour: number;
    month: number;
    year: number;
  };
};

export type AirportStack = NavigationStack<AirportStackParams>;

const Stack = createNativeStackNavigator<AirportStackParams>();

export const AirportStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen component={AirportWeatherPage} name="Weather" />
    </Stack.Navigator>
  );
};
