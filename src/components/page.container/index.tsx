import * as React from 'react';
import { View } from 'react-native';

import { withStyled } from '@app/lib/styled';

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

const Container = withStyled<{ centered?: boolean }, typeof View>(
  View,
  (theme, props) => [
    props.centered && theme.presets.centered,
    {
      backgroundColor: theme.pallette.background,
      display: 'flex',
      flexGrow: 1,
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },
  ],
);
