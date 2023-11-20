import * as React from 'react';
import { Text, View } from 'react-native';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { SpaceKeys } from '@app/themes';
import type { StringOrElement } from '@app/types/string.or.component';

import { withStyled } from '@app/lib/styled';

import { StringRenderer } from '../string.renderer';

type Props = {
  align?: 'center' | 'left' | 'right';
  gap?: SpaceKeys;
  hint?: React.ReactElement | string;
  icon?: React.ReactElement;
  label?: React.ReactElement | string;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  value?: StringOrElement;
  valueStyle?: StyleProp<TextStyle>;
};

export const Statistic: React.FC<Props> = ({
  align,
  gap,
  hint,
  icon,
  label,
  labelStyle,
  style,
  value,
  valueStyle,
}) => {
  return (
    <Container style={[style]}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <Meta align={align} gap={gap}>
        <StringRenderer Container={Label} style={labelStyle}>
          {label}
        </StringRenderer>
        <StringRenderer Container={Value} style={valueStyle}>
          {value}
        </StringRenderer>
        <StringRenderer Container={Hint}>{hint}</StringRenderer>
      </Meta>
    </Container>
  );
};

export const Container = withStyled(View, (theme) => ({
  alignItems: 'center',
  flexDirection: 'row',
  gap: theme.space.small,
}));

export const Value = withStyled(Text, (theme) => [
  theme.typography.presets.h4,
  {
    color: theme.pallette.text,
  },
]);

export const IconContainer = withStyled(View, () => [{}]);

export const Meta = withStyled<Pick<Props, 'align' | 'gap'>, typeof View>(
  View,
  (theme, props) => [
    {
      gap: props.gap ? theme.space[props.gap] : theme.space.tiny,
    },
    props.align === 'center' && {
      alignItems: 'center',
    },
    props.align === 'right' && {
      alignItems: 'flex-end',
    },
  ],
);

export const Hint = withStyled(Text, (theme) => ({
  color: theme.pallette.text,
}));

export const Label = withStyled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.textSecondary,
  },
]);
