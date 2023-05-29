type AllKeyOf<T> = T extends never ? never : keyof T;

type Optional<T, K> = { [P in Extract<keyof T, K>]?: T[P] };

type WithOptional<T, K extends AllKeyOf<T>> = T extends never
  ? never
  : Omit<T, K> & Optional<T, K>;
