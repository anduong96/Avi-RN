import * as React from 'react';

import { FlightSearchStack } from './flight.search.stack';
import type { FlightSearchStackParams } from './flight.search.stack';
import { FlightStack } from './flight.stack';
import type { FlightStackParams } from './flight.stack';
import { HomeOnboardPage } from '@app/pages/home.onboard';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { PrivacyPoliciesPage } from '@app/pages/privacy.policies';
import { ProfilePage } from '@app/pages/profile';
import { SettingsPage } from '@app/pages/settings';
import { TermsOfServicePage } from '@app/pages/terms.of.service';
import { bootApp } from '@app/lib/boot.app';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalState } from '@app/state/global';

export type MainStackParam = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  PrivacyPolicies: undefined;
  TermsOfService: undefined;
  FlightStack: NavigatorScreenParams<FlightStackParams>;
  FlightSearchStack: NavigatorScreenParams<FlightSearchStackParams>;
};

const Stack = createNativeStackNavigator<MainStackParam>();

export const AppNavigator: React.FC = () => {
  const canBoot = globalState.useSelect((state) => state.isFinishStartup);

  React.useEffect(() => {
    if (canBoot) {
      bootApp();
    }
  }, [canBoot]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeOnboardPage} />
      {/* <Stack.Screen name="Home" component={HomePage} /> */}

      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen name="FlightSearchStack" component={FlightSearchStack} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="FlightStack" component={FlightStack} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="PrivacyPolicies" component={PrivacyPoliciesPage} />
        <Stack.Screen name="TermsOfService" component={TermsOfServicePage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
