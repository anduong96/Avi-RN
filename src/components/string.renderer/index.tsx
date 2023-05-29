import * as React from 'react';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { isNil } from 'lodash';

type Props = {
  Container: React.ComponentType<any>;
  style?: StyleProp<ViewStyle | TextStyle>;
  value: React.PropsWithChildren['children'];
};

export const StringRenderer: React.FC<Props> = ({
  value,
  Container,
  style,
}) => {
  if (isNil(value)) {
    return null;
  } else if (React.isValidElement(value)) {
    return value;
  }

  return <Container style={style}>{String(value)}</Container>;
};
