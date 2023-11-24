import * as React from 'react';
import { View } from 'react-native';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { SpaceKeys } from '@app/themes';
import type { StringOrElement } from '@app/types/string.or.component';

import { withStyled } from '@app/lib/styled';

import { Typography } from '../typography';
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
        <StringRenderer Container={Typography} style={labelStyle} type="small">
          {label}
        </StringRenderer>
        <StringRenderer Container={Typography} style={valueStyle} type="p1">
          {value}
        </StringRenderer>
        <StringRenderer Container={Typography} type="tiny">
          {hint}
        </StringRenderer>
      </Meta>
    </Container>
  );
};

export const Container = withStyled(View, (theme) => ({
  alignItems: 'center',
  flexDirection: 'row',
  gap: theme.space.small,
}));

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
