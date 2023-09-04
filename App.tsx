import './src/lib/dates';
import './src/lib/log.box';
import './src/lib/logger';

import * as React from 'react';
import * as Sentry from '@sentry/react-native';

import { Analytics } from '@app/lib/analytics';
import { ApolloProvider } from '@apollo/client';
import { AppNavigator } from '@app/stacks';
import { BackgroundProcesses } from '@app/components/background.processes';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { default as CodePush } from 'react-native-code-push';
import { ForceUpdateShield } from '@app/components/force.update';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LINKING_CONFIG } from '@app/linking';
import type { MainStackParam } from '@app/stacks';
import { NavigationContainer } from '@react-navigation/native';
import type { NavigationContainerRef } from '@react-navigation/native';
import { NestServerApolloClient } from '@app/apollo/nest.server';
import { PortalProvider } from '@gorhom/portal';
import { PushNotificationSheet } from '@app/components/sheet.push.notification';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppStateListener } from '@app/lib/hooks/use.app.state';
import { useColorScheme } from '@app/lib/hooks/use.color.scheme';
import { useNotificationHandling } from '@app/lib/startup/push.notification';
import { useStartupPrep } from '@app/lib/startup';

type NavigationRef = NavigationContainerRef<MainStackParam>;

const Entry: React.FC = () => {
  useColorScheme();
  useStartupPrep();
  useAppStateListener();
  useNotificationHandling();

  const routeNameRef = React.useRef<string>();
  const navigationRef = React.useRef<NavigationRef>(null);

  return (
    <NavigationContainer<MainStackParam>
      ref={navigationRef}
      linking={LINKING_CONFIG}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName && currentRouteName) {
          Analytics.screen(currentRouteName);
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      <ApolloProvider client={NestServerApolloClient}>
        <PortalProvider>
          <BottomSheetModalProvider>
            <AppNavigator />
            <PushNotificationSheet />
            <BackgroundProcesses />
          </BottomSheetModalProvider>
        </PortalProvider>
      </ApolloProvider>
    </NavigationContainer>
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
