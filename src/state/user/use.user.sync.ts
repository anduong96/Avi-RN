import * as React from 'react';

import * as Sentry from '@sentry/react-native';
import auth from '@react-native-firebase/auth';

import { logger } from '@app/lib/logger';
import { AppServerApolloClient } from '@app/apollo/app.server';
import {
  SyncUserDocument,
  UserActiveFlightsDocument,
  UserArchivedFlightsDocument,
} from '@app/generated/server.gql';

import { useUserState } from '.';

export function useUserSync() {
  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      logger.debug('User state changed', user);
      Sentry.setExtra('auth.status', user ? 'authenticated' : 'anonymous');

      if (user) {
        useUserState.getState().setUser(user);
      }

      AppServerApolloClient.mutate({
        errorPolicy: 'ignore',
        mutation: SyncUserDocument,
      });

      AppServerApolloClient.query({
        errorPolicy: 'ignore',
        query: UserActiveFlightsDocument,
      });

      AppServerApolloClient.query({
        errorPolicy: 'ignore',
        query: UserArchivedFlightsDocument,
      });
    });
  }, []);
}
