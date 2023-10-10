import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import * as React from 'react';
import { Text, View } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';

import { styled } from '@app/lib/styled';

import { StringRenderer } from '../string.renderer';

type Props = {
  align?: 'center' | 'left' | 'right';
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
      <Meta align={align}>
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

export const Container = styled(View, (theme) => ({
  alignItems: 'center',
  flexDirection: 'row',
  gap: theme.space.small,
}));

export const Value = styled(Text, (theme) => [theme.typography.presets.h4]);

export const IconContainer = styled(View, () => [{}]);

export const Meta = styled<Pick<Props, 'align'>, typeof View>(
  View,
  (_, props) => [
    props.align === 'center' && {
      alignItems: 'center',
    },
    props.align === 'right' && {
      alignItems: 'flex-end',
    },
  ],
);

export const Hint = styled(Text, () => ({}));

export const Label = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.textSecondary,
  },
]);
