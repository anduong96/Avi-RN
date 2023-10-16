import type * as React from 'react';

import { useSubscription } from '@app/lib/hooks/use.subscription';

import { InputPublisher } from './publisher';

export function useKeyboardSubmitEvent(
  onTrigger: (value?: unknown) => void,
  deps: React.DependencyList,
) {
  return useSubscription(
    () => InputPublisher.subscribe('submit', onTrigger),
    deps,
  );
}
