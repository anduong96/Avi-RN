import { useSubscription } from '@app/lib/hooks/use.subscription';
import { InputPublisher } from './publisher';
import type * as React from 'react';

export function useKeyboardSubmitEvent(
  onTrigger: (value?: any) => void,
  deps: React.DependencyList,
) {
  return useSubscription(
    () => InputPublisher.subscribe('submit', onTrigger),
    deps,
  );
}
