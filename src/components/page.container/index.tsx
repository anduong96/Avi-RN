import * as React from 'react';

import type { StyleProp, View, ViewStyle } from 'react-native';

import { Container } from './styles';

type Props = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  centered?: boolean;
}> &
  React.ComponentProps<typeof View>;

export const PageContainer: React.FC<Props> = ({
  children,
  style,
  centered,
  ...props
}) => {
  return (
    <Container {...props} centered={centered} style={[style]}>
      {children}
    </Container>
  );
};
