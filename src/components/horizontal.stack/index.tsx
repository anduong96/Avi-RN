import type { StyleProp, TextStyle } from 'react-native';

import * as React from 'react';
import { Text, View } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';

import { styled } from '@app/lib/styled';

import { StringRenderer } from '../string.renderer';

type Props = {
  textStyle?: StyleProp<TextStyle>;
  value: Array<StringOrElement> | StringOrElement;
};

export const HorizontalStack: React.FC<Props> = ({ textStyle, value }) => {
  const renderTargets = Array.isArray(value) ? value : [value];
  const lastIndex = renderTargets.length - 1;

  return (
    <Container>
      {renderTargets.map((Element, index) => (
        <React.Fragment key={index}>
          <StringRenderer Container={Label} style={textStyle}>
            {Element}
          </StringRenderer>
          {index !== lastIndex && <Label>⸱</Label>}
        </React.Fragment>
      ))}
    </Container>
  );
};

const Container = styled(View, () => ({
  flexDirection: 'row',
}));

const Label = styled(Text, () => ({}));
