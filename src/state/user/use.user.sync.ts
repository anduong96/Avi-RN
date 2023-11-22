import * as React from 'react';

import auth from '@react-native-firebase/auth';

import { logger } from '@app/lib/logger';
import { SyncUserDocument } from '@app/generated/server.gql';
import { AppServerApolloClient } from '@app/apollo/app.server';

import { useUserState } from '.';

export function useUserSync() {
  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      logger.debug('User state changed', user);

      if (user) {
        useUserState.getState().setUser(user);
      }

      AppServerApolloClient.mutate({
        errorPolicy: 'ignore',
        mutation: SyncUserDocument,
      });
    });
  }, []);
}
