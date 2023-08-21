import * as React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import RegFaIcon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  name: string;
  size?: number;
  color?: string;
  disabled?: boolean;
  isActive?: boolean;
  type?: 'fa' | 'fa5';
  style?: React.ComponentProps<typeof RegFaIcon>['style'];
};

export const FaIcon: React.FC<Props> = ({
  name,
  size = 15,
  color,
  disabled,
  isActive,
  style,
  type = 'fa5',
}) => {
  const theme = useTheme();
  const iconColor = disabled
    ? theme.pallette.grey[200]
    : isActive
    ? theme.pallette.active
    : color || theme.pallette.grey[600];

  if (type === 'fa') {
    return (
      <RegFaIcon style={style} name={name} size={size} color={iconColor} />
    );
  }

  return <Icon style={style} name={name} size={size} color={iconColor} />;
};
