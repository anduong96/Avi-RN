import * as React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome6Pro';

import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  color?: 'active' | string;
  disabled?: boolean;
  size?: number;
} & Pick<
  Icon['props'],
  | 'brand'
  | 'duotone'
  | 'light'
  | 'name'
  | 'selectionColor'
  | 'sharpSolid'
  | 'solid'
  | 'style'
  | 'thin'
>;

export const FaIcon: React.FC<Props> = ({
  color,
  disabled,
  size = 20,
  ...props
}) => {
  const theme = useTheme();
  const iconColor = disabled
    ? theme.pallette.grey[200]
    : color === 'active'
      ? theme.pallette.active
      : color || theme.pallette.grey[900];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Icon solid {...props} color={iconColor} size={size} />;
};
