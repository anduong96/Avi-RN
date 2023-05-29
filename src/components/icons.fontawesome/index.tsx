import * as React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  name: string;
  size?: number;
  color?: string;
  disabled?: boolean;
  isActive?: boolean;
};

export const FaIcon: React.FC<Props> = ({
  name,
  size = 15,
  color,
  disabled,
  isActive,
}) => {
  const theme = useTheme();
  const iconColor = disabled
    ? theme.pallette.grey[200]
    : isActive
    ? theme.pallette.active
    : color || theme.pallette.grey[600];

  return <Icon name={name} size={size} color={iconColor} />;
};
