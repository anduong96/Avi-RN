import * as React from 'react';

import { Image } from 'react-native';

export type Props = Omit<React.ComponentProps<typeof Image>, 'source'>;

export const Logo: React.FC<Props> = (props) => {
  return (
    <Image
      source={require('@app/assets/logo.png')}
      resizeMode="contain"
      {...props}
    />
  );
};
