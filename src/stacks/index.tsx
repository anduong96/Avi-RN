import * as React from 'react';

import { ArchivedFlightsPage } from '@app/pages/flights.archived';
import { DebugMenuPage } from '@app/pages/debug.menu';
import { FlightSearchStack } from './flight.search.stack';
import type { FlightSearchStackParams } from './flight.search.stack';
import { FlightStack } from './flight.stack';
import type { FlightStackParams } from './flight.stack';
import { GlobalState } from '@app/state/global';
import { HomePage } from '@app/pages/home';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { PrivacyPoliciesPage } from '@app/pages/privacy.policies';
import { ProfilePage } from '@app/pages/profile';
import { SettingsPage } from '@app/pages/settings';
import { TermsOfServicePage } from '@app/pages/terms.of.service';
import { bootApp } from '@app/lib/boot.app';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { isNil } from 'lodash';
import { useGetUserFlightsQuery } from '@app/generated/server.gql';

export type MainStackParam = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  PrivacyPolicies: undefined;
  TermsOfService: undefined;
  ArchivedFlights: undefined;
  FlightStack: NavigatorScreenParams<FlightStackParams>;
  FlightSearchStack: NavigatorScreenParams<FlightSearchStackParams>;
  Debug: undefined;
};

const Stack = createNativeStackNavigator<MainStackParam>();

export const AppNavigator: React.FC = () => {
  const userFlights = useGetUserFlightsQuery();
  const canBoot = GlobalState.useSelect((state) => state.isFinishStartup);
  const userFlightsLoaded = !isNil(userFlights.data?.userFlights);

  React.useEffect(() => {
    if (canBoot && userFlightsLoaded) {
      bootApp();
    }
  }, [canBoot, userFlightsLoaded]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="ArchivedFlights" component={ArchivedFlightsPage} />
        <Stack.Screen name="FlightStack" component={FlightStack} />
        <Stack.Screen name="FlightSearchStack" component={FlightSearchStack} />
        <Stack.Screen name="Debug" component={DebugMenuPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="PrivacyPolicies" component={PrivacyPoliciesPage} />
        <Stack.Screen name="TermsOfService" component={TermsOfServicePage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
