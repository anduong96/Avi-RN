import './src/lib/dates';
import './src/lib/logger';
import './src/lib/log.box';
import './src/lib/analytics/start.up';

import type { NavigationContainerRef } from '@react-navigation/native';

import * as React from 'react';
import { StatusBar } from 'react-native';
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
import { AppServerApolloClient } from '@app/apollo/app.server';
import { ForceUpdateShield } from '@app/components/force.update';
import { BackgroundSync } from '@app/components/background.sync';
import { PushNotificationSheet } from '@app/components/sheet.push.notification';

import { logger } from './src/lib/logger';

type NavigationRef = NavigationContainerRef<MainStackParam>;

const Entry: React.FC = () => {
  const routeNameRef = React.useRef<string>();
  const navigationRef = React.useRef<NavigationRef>(null);

  const handleNavigationReady = () => {
    logger.info('Navigation ready');
    const currentRoute = navigationRef.current?.getCurrentRoute();
    routeNameRef.current = currentRoute?.name;
  };

  const handleStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRoute = navigationRef.current?.getCurrentRoute();
    const currentRouteName = currentRoute?.name;
    routeNameRef.current = currentRouteName;

    if (previousRouteName !== currentRouteName && currentRouteName) {
      Analytics.screen(currentRouteName);
      logger.debug(
        `Route changed from ${previousRouteName} to ${currentRouteName}`,
      );
    }
  };

  return (
    <PortalProvider>
      <NavigationContainer<MainStackParam>
        linking={LINKING_CONFIG}
        onReady={handleNavigationReady}
        onStateChange={handleStateChange}
        ref={navigationRef}
      >
        <ApolloProvider client={AppServerApolloClient}>
          <PortalHost name={APP_PORTAL_HOST} />
          <BottomSheetModalProvider>
            <BackgroundSync />
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
      <StatusBar hidden />
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
