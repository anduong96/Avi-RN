import * as React from 'react';

import { styled } from '@app/lib/styled';
import { Image, View } from 'react-native';

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
        source={require('@app/assets/logo.png')}
        resizeMode="contain"
        type={type}
        {...props}
      />
    </Container>
  );
};

const Container = styled<{ size: number }, typeof View>(View, (_, props) => [
  {
    width: props.size,
    height: undefined,
    overflow: 'hidden',
    aspectRatio: 1,
  },
]);

const LogoImage = styled<{ type?: 'dark' | 'light' }, typeof Image>(
  Image,
  (_, props) => [
    props.type === 'light' && {
      tintColor: '#fff',
    },
    {
      width: '100%',
      height: '100%',
    },
  ],
);
