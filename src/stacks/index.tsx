import * as React from 'react';

import { useUserHasFlightsQuery } from '@app/generated/server.gql';
import { bootApp } from '@app/lib/boot.app';
import { DebugMenuPage } from '@app/pages/debug.menu';
import { FlightSearchPage } from '@app/pages/flight.search';
import { HomePage } from '@app/pages/home';
import { PrivacyPoliciesPage } from '@app/pages/privacy.policies';
import { ProfilePage } from '@app/pages/profile';
import { SettingsPage } from '@app/pages/settings';
import { TermsOfServicePage } from '@app/pages/terms.of.service';
import { GlobalState } from '@app/state/global';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { isNil } from 'lodash';
import type { FlightStackParams } from './flight.stack';
import { FlightStack } from './flight.stack';

export type MainStackParam = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  PrivacyPolicies: undefined;
  TermsOfService: undefined;
  FlightStack: NavigatorScreenParams<FlightStackParams>;
  FlightSearch: undefined;
  Debug: undefined;
};

export type MainStack<T extends keyof MainStackParam> =
  NativeStackNavigationProp<MainStackParam, T>;

const Stack = createNativeStackNavigator<MainStackParam>();

export const AppNavigator: React.FC = () => {
  const userFlights = useUserHasFlightsQuery({ fetchPolicy: 'cache-only' });
  const userFlightsLoaded = !isNil(userFlights.data?.userHasFlights);
  const canBoot = GlobalState.useSelect(
    (state) => state.isFinishStartup && state.isReady,
  );

  React.useEffect(() => {
    if (canBoot && userFlightsLoaded) {
      bootApp();
    }
  }, [canBoot, userFlightsLoaded]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="FlightStack" component={FlightStack} />
        <Stack.Screen name="FlightSearch" component={FlightSearchPage} />
        <Stack.Screen name="Debug" component={DebugMenuPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="PrivacyPolicies" component={PrivacyPoliciesPage} />
        <Stack.Screen name="TermsOfService" component={TermsOfServicePage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
