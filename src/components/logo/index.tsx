import * as React from 'react';

import type { Image } from 'react-native';
import { StyledImage } from './styles';

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
    <StyledImage
      source={require('@app/assets/logo.png')}
      resizeMode="contain"
      size={size}
      type={type}
      {...props}
    />
  );
};
