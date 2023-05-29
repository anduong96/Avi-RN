import * as React from 'react';

import { Container, Label } from './styles';
import type { StyleProp, TextStyle } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';
import { StringRenderer } from '../string.renderer';

type Props = {
  value: StringOrElement | Array<StringOrElement>;
  textStyle?: StyleProp<TextStyle>;
};

export const HorizontalStack: React.FC<Props> = ({ value, textStyle }) => {
  const renderTargets = Array.isArray(value) ? value : [value];
  const lastIndex = renderTargets.length - 1;

  return (
    <Container>
      {renderTargets.map((Element, index) => (
        <React.Fragment key={index}>
          <StringRenderer value={Element} Container={Label} style={textStyle} />
          {index !== lastIndex && <Label>⸱</Label>}
        </React.Fragment>
      ))}
    </Container>
  );
};
