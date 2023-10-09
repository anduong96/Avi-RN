import * as React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome6Pro';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  size?: number;
  color?: string;
  disabled?: boolean;
  isActive?: boolean;
} & Pick<
  Icon['props'],
  | 'style'
  | 'light'
  | 'thin'
  | 'brand'
  | 'duotone'
  | 'sharpSolid'
  | 'solid'
  | 'name'
>;

export const FaIcon: React.FC<Props> = ({
  size = 15,
  color,
  disabled,
  isActive,
  ...props
}) => {
  const theme = useTheme();
  const iconColor = disabled
    ? theme.pallette.grey[200]
    : isActive
    ? theme.pallette.active
    : color || theme.pallette.grey[600];

  // @ts-ignore
  return <Icon light {...props} size={size} color={iconColor} />;
};
