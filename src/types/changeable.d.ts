export type Changeable<T, P extends object> = P & {
  value?: T;
  onChange?: (value: T) => void;
};
