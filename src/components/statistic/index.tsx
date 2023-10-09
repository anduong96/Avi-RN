import * as React from 'react';

import { Container, Hint, IconContainer, Label, Meta, Value } from './styles';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';
import { StringRenderer } from '../string.renderer';

type Props = {
  icon?: React.ReactElement;
  value?: StringOrElement;
  hint?: string | React.ReactElement;
  label?: string | React.ReactElement;
  style?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const Statistic: React.FC<Props> = ({
  icon,
  value,
  hint,
  label,
  style,
  valueStyle,
  labelStyle,
}) => {
  return (
    <Container style={[style]}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <Meta>
        <StringRenderer value={label} Container={Label} style={labelStyle} />
        <StringRenderer value={value} Container={Value} style={valueStyle} />
        <StringRenderer value={hint} Container={Hint} />
      </Meta>
    </Container>
  );
};
