import './src/lib/dates';
import './src/lib/log.box';
import './src/lib/logger';

import * as React from 'react';
import * as Sentry from '@sentry/react-native';

import { Analytics } from '@app/lib/analytics';
import { ApolloProvider } from '@apollo/client';
import { AppNavigator } from '@app/stacks';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { default as CodePush } from 'react-native-code-push';
import { ForceUpdateShield } from '@app/components/force.update';
import { NavigationContainer } from '@react-navigation/native';
import type { NavigationContainerRef } from '@react-navigation/native';
import { NestServerApolloClient } from '@app/apollo/nest.server';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { globalState } from '@app/state/global';
import { startup } from '@app/lib/startup';
import { useColorScheme } from '@app/lib/hooks/use.color.scheme';

type NavigationRef = NavigationContainerRef<ReactNavigation.RootParamList>;

const Entry: React.FC = () => {
  useColorScheme();

  const routeNameRef = React.useRef<string>();
  const navigationRef = React.useRef<NavigationRef>(null);

  React.useEffect(() => {
    startup().finally(() => {
      globalState.actions.setIsStartUpFinish();
    });
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
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
        <BottomSheetModalProvider>
          <PortalProvider>
            <AppNavigator />
          </PortalProvider>
        </BottomSheetModalProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <React.Suspense>
        <ForceUpdateShield />
        <Entry />
      </React.Suspense>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(
  CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL,
  })(App),
);
