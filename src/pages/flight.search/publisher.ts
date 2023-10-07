import { useSubscription } from '@app/lib/hooks/use.subscription';
import { TopicPublisher } from '@app/lib/topic.publisher';
import type React from 'react';

type Topics = {
  Selected: undefined;
};

export const Publisher = new TopicPublisher<Topics>('Flight Search');

/**
 * The `useTopic` function is a TypeScript function that subscribes to a specific topic and triggers a
 * callback function when the topic is updated.
 * @param {K} key - The `key` parameter is a generic type `K` that extends the keyof `Topics` type. It
 * represents the key of the topic that you want to subscribe to.
 * @param onTrigger - The `onTrigger` parameter is a callback function that will be called whenever a
 * new value is published for the specified topic. It takes one argument, `value`, which represents the
 * value published for that topic.
 */
export function useTopic<K extends keyof Topics>(
  key: K,
  onTrigger: (value: Topics[K]) => void,
  deps: React.DependencyList,
) {
  return useSubscription(() => Publisher.subscribe(key, onTrigger), deps);
}
