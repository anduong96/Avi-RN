export type Changeable<T, P extends object> = P & {
  onChange?: (value: T) => void;
  value?: T;
};
