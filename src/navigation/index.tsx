import type { NavigatorScreenParams } from '@react-navigation/native';
import type {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import * as React from 'react';
import { Platform } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomePage } from '@app/pages/home';
import { ProfilePage } from '@app/pages/profile';
import { DebugMenuPage } from '@app/pages/debug.menu';
import { useBootApp } from '@app/lib/hooks/use.boot.app';
import { FlightSearchPage } from '@app/pages/flight.search';
import { TermsOfServicePage } from '@app/pages/terms.of.service';
import { ArchivedFlightsPage } from '@app/pages/flights.archived';
import { PrivacyPoliciesPage } from '@app/pages/privacy.policies';

import type { FlightStackParams } from './flight.stack';

import { FlightStack } from './flight.stack';
import { ROOT_NAVIGATOR_ID } from './_constants';

export type MainStackParam = {
  Debug: undefined;
  FlightSearch: undefined;
  FlightStack: NavigatorScreenParams<FlightStackParams>;
  FlightsArchive: undefined;
  Home: undefined;
  PrivacyPolicies: undefined;
  Profile: undefined;
  TermsOfService: undefined;
};

export type MainStack<T extends keyof MainStackParam = 'Home'> =
  NativeStackNavigationProp<MainStackParam, T>;

const Stack = createNativeStackNavigator<MainStackParam>();

export const AppNavigator: React.FC = () => {
  useBootApp();

  return (
    <Stack.Navigator
      id={ROOT_NAVIGATOR_ID}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={HomePage} name="Home" />
      <Stack.Group
        screenOptions={Platform.select<NativeStackNavigationOptions>({
          android: {
            animation: 'slide_from_bottom',
            presentation: 'transparentModal',
          },
          ios: {
            presentation: 'modal',
          },
        })}
      >
        <Stack.Screen component={FlightStack} name="FlightStack" />
        <Stack.Screen component={FlightSearchPage} name="FlightSearch" />
        <Stack.Screen component={DebugMenuPage} name="Debug" />
        <Stack.Screen component={ProfilePage} name="Profile" />
        <Stack.Screen component={PrivacyPoliciesPage} name="PrivacyPolicies" />
        <Stack.Screen component={TermsOfServicePage} name="TermsOfService" />
        <Stack.Screen component={ArchivedFlightsPage} name="FlightsArchive" />
      </Stack.Group>
    </Stack.Navigator>
  );
};
