import './src/lib/dates';
import './src/lib/logger';
import './src/lib/log.box';
import './src/lib/analytics/start.up';

import * as React from 'react';
import { StatusBar } from 'react-native';
import { default as CodePush } from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as Sentry from '@sentry/react-native';
import { ApolloProvider } from '@apollo/client';
import { PortalHost, PortalProvider } from '@gorhom/portal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppNavigator } from '@app/navigation';
import { APP_PORTAL_HOST } from '@app/lib/portal';
import { AppServerApolloClient } from '@app/apollo/app.server';
import { ForceUpdateShield } from '@app/components/force.update';
import { BackgroundSync } from '@app/components/background.sync';
import { PushNotificationSheet } from '@app/components/sheet.push.notification';

const queryClient = new QueryClient();
function App() {
  return (
    <SafeAreaProvider>
      <StatusBar hidden />
      <ApolloProvider client={AppServerApolloClient}>
        <QueryClientProvider client={queryClient}>
          <React.Suspense>
            <ForceUpdateShield />
            <PortalProvider>
              <PortalHost name={APP_PORTAL_HOST} />
              <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                  <BackgroundSync />
                  <AppNavigator />
                  <PushNotificationSheet />
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </PortalProvider>
          </React.Suspense>
        </QueryClientProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(
  CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL,
  })(App),
);
