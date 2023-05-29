import * as React from 'react';

import { Image } from 'react-native';
import { SignInBtn } from './btn';
import { signInWithGoogle } from '@app/lib/auth/google.auth';

export const GoogleSignInBtn: React.FC = () => {
  return (
    <SignInBtn
      onPress={() => signInWithGoogle()}
      icon={
        <Image
          style={{ width: 25, height: 25 }}
          source={require('./assets/google.png')}
        />
      }
    >
      Continue with Google
    </SignInBtn>
  );
};
