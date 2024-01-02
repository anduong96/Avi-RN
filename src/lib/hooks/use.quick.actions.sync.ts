import type { ShortcutItem } from 'react-native-actions-shortcuts';

import * as React from 'react';
import { NativeEventEmitter } from 'react-native';
import Shortcuts from 'react-native-actions-shortcuts';

import type { NativeModule } from 'react-native';

import * as Sentry from '@sentry/react-native';

import { useRootNavigation } from '@app/navigation/use.root.navigation';

import { castError } from '../cast.error';
import { useLogger } from '../logger/use.logger';

enum Action {
  FEEDBACK = 'FEEDBACK',
  SEARCH_FLIGHTS = 'SEARCH_FLIGHTS',
}

const ShortCutsModule = Shortcuts as unknown as NativeModule;
const ShortcutsEmitter = new NativeEventEmitter(ShortCutsModule);
const QUICK_ACTIONS: ShortcutItem[] = [
  {
    iconName: 'ic_flight_search',
    subtitle: 'Search for flights',
    title: 'Search Flights',
    type: Action.SEARCH_FLIGHTS,
  },
  {
    iconName: 'ic_feedback',
    subtitle: 'Provide feedback',
    title: 'Provide Feedback',
    type: Action.FEEDBACK,
  },
];

export function useQuickActionsSync() {
  const logger = useLogger('useQuickActionsSync');
  const navigation = useRootNavigation();

  const setShortcuts = React.useCallback(async () => {
    try {
      logger.debug('Registering quick actions');
      const actions = await Shortcuts.setShortcuts(QUICK_ACTIONS);
      logger.debug('Registered quick actions=%j', actions);
    } catch (error) {
      logger.error(
        'Failed to register quick actions: %s',
        castError(error).message,
      );
      Sentry.captureException(error);
    }
  }, [logger]);

  const handleQuickActions = React.useCallback(
    (item?: ShortcutItem | null) => {
      logger.debug('Quick action=%j', item);

      if (!item) {
        return;
      }

      if (item.type === Action.SEARCH_FLIGHTS) {
        navigation.push('FlightSearch');
      } else if (item.type === Action.FEEDBACK) {
        navigation.push('Feedback');
      }
    },
    [logger, navigation],
  );

  React.useEffect(() => {
    Shortcuts.getInitialShortcut().then(handleQuickActions);
  }, [handleQuickActions]);

  React.useEffect(() => {
    setShortcuts();
  }, [setShortcuts]);

  React.useEffect(() => {
    ShortcutsEmitter.addListener('onShortcutItemPressed', handleQuickActions);

    return () => {
      ShortcutsEmitter.removeAllListeners('onShortcutItemPressed');
    };
  }, [handleQuickActions]);
}
