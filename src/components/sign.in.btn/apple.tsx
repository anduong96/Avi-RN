import * as React from 'react';

import { MaterialIcon } from '../material.icons';
import { SignInBtn } from './btn';
import { signInWithApple } from '@app/lib/auth/apple.auth';
import { useTheme } from '@app/lib/hooks/use.theme';

export const AppleSignInBtn: React.FC = () => {
  const theme = useTheme();

  return (
    <SignInBtn
      onPress={() => signInWithApple()}
      icon={
        <MaterialIcon name="apple" size={25} color={theme.pallette.black} />
      }
    >
      Continue with Apple
    </SignInBtn>
  );
};
