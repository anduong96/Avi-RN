import * as React from 'react';

import { HomePage } from '@app/pages/home';
import { PrivacyPoliciesPage } from '@app/pages/privacy.policies';
import { TermsOfServicePage } from '@app/pages/terms.of.service';
import { bootApp } from '@app/lib/boot.app';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalState } from '@app/state/global';

export type MainStackParam = {
  Home: undefined;
  PrivacyPolicies: undefined;
  TermsOfService: undefined;
};

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  const canBoot = globalState.useSelect((state) => state.isFinishStartup);

  React.useEffect(() => {
    if (canBoot) {
      bootApp();
    }
  }, [canBoot]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="PrivacyPolicies" component={PrivacyPoliciesPage} />
        <Stack.Screen name="TermsOfService" component={TermsOfServicePage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
