export type TopicListener<V = unknown> = (value: V) => void | Promise<void>;
