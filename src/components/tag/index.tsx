import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import * as React from 'react';
import { Text, View } from 'react-native';

import tinycolor from 'tinycolor2';

import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  children: string;
  color?: string;
  labelStyle?: StyleProp<TextStyle>;
  postfix?: React.ReactElement;
  prefix?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
};

export const Tag: React.FC<Props> = ({
  children,
  color,
  labelStyle,
  postfix,
  prefix,
  style,
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

const Container = styled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.grey[300],
    borderRadius: theme.borderRadius,
    columnGap: 2,
    flexDirection: 'row',
    paddingHorizontal: theme.space.tiny,
    paddingVertical: 2,
  },
]);

const Label = styled(Text, (theme) => [theme.typography.presets.small]);
