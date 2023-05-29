export type OptionItem = {
  label: string;
  isDanger?: boolean;
  hint?: string;
  icon?: React.ReactElement;
  disabled?: boolean;
  loading?: boolean;
  onPress?: (fromItem?: boolean) => void | Promise<void>;
};
