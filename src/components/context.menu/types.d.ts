export type OptionItem = {
  disabled?: boolean;
  hint?: string;
  icon?: React.ReactElement;
  isDanger?: boolean;
  label: string;
  loading?: boolean;
  onPress?: (fromItem?: boolean) => Promise<void> | void;
};
