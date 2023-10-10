export type TopicListener<V = unknown> = (value: V) => Promise<void> | void;
