import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import * as React from 'react';

import { isNil } from 'lodash';

type Props<T extends React.ComponentType> = {
  Container: T;
  children: React.PropsWithChildren['children'];
  style?: StyleProp<TextStyle | ViewStyle>;
} & React.ComponentProps<T>;

export function StringRenderer<T extends React.ComponentType>({
  Container,
  children,
  style,
  ...props
}: Props<T>) {
  if (isNil(children) || children === '') {
    return null;
  } else if (React.isValidElement(children)) {
    return children;
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Container {...(props ?? {})} style={style}>
      {String(children)}
    </Container>
  );
}
