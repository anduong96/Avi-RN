import './src/lib/dates';
import './src/lib/logger';
import './src/lib/log.box';
import './src/lib/analytics/start.up';

import type { NavigationContainerRef } from '@react-navigation/native';

import * as React from 'react';
import { default as CodePush } from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as Sentry from '@sentry/react-native';
import { ApolloProvider } from '@apollo/client';
import { PortalHost, PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import type { MainStackParam } from '@app/navigation';

import { LINKING_CONFIG } from '@app/linking';
import { Analytics } from '@app/lib/analytics';
import { AppNavigator } from '@app/navigation';
import { APP_PORTAL_HOST } from '@app/lib/portal';
import { useStartup } from '@app/lib/startup/use.startup';
import { useUserSync } from '@app/state/user/use.user.sync';
import { AppServerApolloClient } from '@app/apollo/app.server';
import { useAppStateSync } from '@app/lib/hooks/use.app.state';
import { ForceUpdateShield } from '@app/components/force.update';
import { useColorScheme } from '@app/lib/hooks/use.color.scheme';
import { useNotificationHandling } from '@app/lib/startup/push.notification';
import { PushNotificationSheet } from '@app/components/sheet.push.notification';
import { useFlightPushSync } from '@app/state/flights.notifications/use.flight.push';

type NavigationRef = NavigationContainerRef<MainStackParam>;

const Entry: React.FC = () => {
  useUserSync();
  useFlightPushSync();
  useStartup();
  useColorScheme();
  useAppStateSync();
  useNotificationHandling();

  const routeNameRef = React.useRef<string>();
  const navigationRef = React.useRef<NavigationRef>(null);

  return (
    <PortalProvider>
      <NavigationContainer<MainStackParam>
        linking={LINKING_CONFIG}
        onReady={() => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef.current?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName && currentRouteName) {
            Analytics.screen(currentRouteName);
          }

          routeNameRef.current = currentRouteName;
        }}
        ref={navigationRef}
      >
        <ApolloProvider client={AppServerApolloClient}>
          <PortalHost name={APP_PORTAL_HOST} />
          <BottomSheetModalProvider>
            <AppNavigator />
            <PushNotificationSheet />
          </BottomSheetModalProvider>
        </ApolloProvider>
      </NavigationContainer>
    </PortalProvider>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <React.Suspense>
        <ForceUpdateShield />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Entry />
        </GestureHandlerRootView>
      </React.Suspense>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(
  CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL,
  })(App),
);
