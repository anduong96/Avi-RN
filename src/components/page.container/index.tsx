import * as React from 'react';
import { View } from 'react-native';

import { styled } from '@app/lib/styled';

type Props = React.PropsWithChildren<{
  centered?: boolean;
}> &
  React.ComponentProps<typeof View>;

export const PageContainer: React.FC<Props> = ({
  centered,
  children,
  style,
  ...props
}) => {
  return (
    <Container {...props} centered={centered} style={[style]}>
      {children}
    </Container>
  );
};

const Container = styled<{ centered?: boolean }, typeof View>(
  View,
  (theme, props) => [
    props.centered && theme.presets.centered,
    {
      backgroundColor: theme.pallette.background,
      display: 'flex',
      flexGrow: 1,
      overflow: 'hidden',
    },
  ],
);
