import * as React from 'react';

import { Container, Label } from './styles';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import tinycolor from 'tinycolor2';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  children: string;
  color?: string;
  prefix?: React.ReactElement;
  postfix?: React.ReactElement;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export const Tag: React.FC<Props> = ({
  children,
  color,
  prefix,
  postfix,
  style,
  labelStyle,
}) => {
  const theme = useTheme();
  const { backgroundColor, textColor } = React.useMemo(() => {
    const baseColor = tinycolor(color || theme.pallette.grey[400]);
    const bgColor = baseColor.setAlpha(0.2).toRgbString();
    const tColor = 'black';

    return {
      backgroundColor: bgColor,
      textColor: tColor,
    };
  }, [color, theme]);

  return (
    <Container style={[{ backgroundColor }, style]}>
      {prefix}
      <Label style={[{ color: textColor }, labelStyle]}>{children}</Label>
      {postfix}
    </Container>
  );
};
