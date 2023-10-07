import { noop } from 'lodash';
import { logger } from '../logger';
import type { TopicListener } from './types';

export class TopicPublisher<T extends Record<string, unknown>> {
  private readonly logger: ReturnType<(typeof logger)['extend']>;
  private readonly listeners: Map<keyof T, TopicListener[]> = new Map();

  constructor(name?: string) {
    this.logger = logger.extend('TopicPublisher::' + (name || 'UNKNOWN'));
  }

  private getTopicListeners<K extends keyof T>(topic: K) {
    if (!this.listeners.has(topic)) {
      this.listeners.set(topic, []);
    }

    return this.listeners.get(topic)!;
  }

  /**
   * The `subscribe` function allows you to subscribe to a specific topic and receive notifications when
   * that topic is triggered.
   * @param {K} topic - The `topic` parameter represents the topic to which you want to subscribe. It is
   * a key of the generic type `T`, which means it should be a valid key of the object type `T`.
   * @param onTopic - The `onTopic` parameter is a callback function that will be invoked when a new
   * message is published on the specified topic. The callback function will receive the message as its
   * argument.
   * @returns The `subscribe` function returns a function called `unsubscribe`.
   */
  subscribe<K extends keyof T>(topic: K, onTopic: TopicListener<T[K]>) {
    const listeners = this.getTopicListeners(topic);
    const listener = onTopic as TopicListener;
    listeners.push(listener);

    return () => {
      const index = this.getTopicListeners(topic).indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  /**
   * The function `broadcastAsync` broadcasts a value to all listeners subscribed to a specific topic.
   * @param {K} topic - The `topic` parameter represents the topic of the broadcast. It is a key of the
   * generic type `T`, which means it can be any valid key of the type `T`.
   * @param {V} value - The `value` parameter represents the value that will be passed to the listeners
   * subscribed to the specified topic. It can be of any type that matches the type of the topic.
   */
  async broadcastAsync<K extends keyof T, V extends T[K]>(topic: K, value: V) {
    const listeners = this.getTopicListeners(topic);
    this.logger.debug(`Broadcasting topic[${String(topic)}]`);
    await Promise.allSettled(listeners.map((listener) => listener(value)));
  }

  /**
   * The `broadcast` function sends a message to all subscribers of a specific topic with a given value.
   * @param {K} topic - The `topic` parameter is a key of an object `T`. It represents the topic or event
   * that you want to broadcast.
   * @param {V} value - The `value` parameter is the value that will be broadcasted to the specified
   * topic. It can be of any type that is assignable to the type of the topic.
   */
  broadcast<K extends keyof T, V extends T[K]>(topic: K, value: V) {
    this.broadcastAsync(topic, value).catch(noop);
  }
}
