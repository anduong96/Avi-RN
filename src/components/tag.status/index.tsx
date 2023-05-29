import * as React from 'react';

import { Container, Icon, IconText, Label } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';

import { MaterialIcon } from '../icons.material';
import tinycolor from 'tinycolor2';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  size?: number;
  children: string;
  isSelelected?: boolean;
  isDisabled?: boolean;
  hideDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
  value?: number | boolean;
};

export const TagStatus: React.FC<Props> = ({
  value,
  children,
  size = 12,
  isDisabled,
  isSelelected,
  style,
}) => {
  const theme = useTheme();
  const iconSize = size + 3;
  const [iconName, iconBg] =
    value === true || (typeof value === 'number' && value > 0)
      ? ['check-bold', theme.pallette.successLight]
      : isDisabled
      ? ['circle-off', theme.pallette.grey[500]]
      : isSelelected
      ? ['check', theme.pallette.active]
      : ['cancel', theme.pallette.grey[500]];

  return (
    <Container style={[style]}>
      <Icon
        style={[
          {
            backgroundColor: tinycolor(iconBg).setAlpha(0.1).toRgbString(),
            borderRadius: iconSize,
            width: iconSize * 1.5,
            height: iconSize,
          },
          iconBg !== theme.pallette.grey[500] && [
            theme.presets.shadows[100],
            {
              shadowColor: iconBg,
              shadowOpacity: 0.8,
            },
          ],
        ]}
      >
        {typeof value === 'number' && value > 0 ? (
          <IconText style={[{ color: iconBg }]}>{value}</IconText>
        ) : (
          iconName && (
            <MaterialIcon color={iconBg} size={size} name={iconName} />
          )
        )}
      </Icon>
      <Label style={{ fontSize: size - 3 }}>{children}</Label>
    </Container>
  );
};
