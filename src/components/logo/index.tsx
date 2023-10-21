import * as React from 'react';
import { Image, View } from 'react-native';

import { withStyled } from '@app/lib/styled';

export type Props = Omit<React.ComponentProps<typeof Image>, 'source'> & {
  size?: number;
  type?: 'dark' | 'light';
};

export const Logo: React.FC<Props> = ({
  size = 50,
  type = 'dark',
  ...props
}) => {
  return (
    <Container size={size}>
      <LogoImage
        resizeMode="contain"
        source={require('@app/assets/logo.png')}
        type={type}
        {...props}
      />
    </Container>
  );
};

const Container = withStyled<{ size: number }, typeof View>(
  View,
  (_, props) => [
    {
      aspectRatio: 1,
      height: undefined,
      overflow: 'hidden',
      width: props.size,
    },
  ],
);

const LogoImage = withStyled<{ type?: 'dark' | 'light' }, typeof Image>(
  Image,
  (_, props) => [
    props.type === 'light' && {
      tintColor: '#fff',
    },
    {
      height: '100%',
      width: '100%',
    },
  ],
);
