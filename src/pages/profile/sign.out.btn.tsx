import * as React from 'react';

import { styled } from '@app/lib/styled';
import { useUser } from '@app/state/user';
import { Button } from '@app/components/button';
import { signOut } from '@app/lib/auth/sign.out';
import { vibrate } from '@app/lib/haptic.feedback';
import { usePrompt } from '@app/components/prompt/use.prompt';

export const SignOutBtn: React.FC = () => {
  const user = useUser();
  const prompt = usePrompt();
  const [isLoading, setIsLoading] = React.useState(false);

  if (user.isAnonymous) {
    return null;
  }

  const handleSignOut = () => {
    prompt({
      onAccept: async () => {
        setIsLoading(true);
        vibrate('effectClick');
        await signOut();
        setIsLoading(false);
      },
    });
  };

  return (
    <Btn
      disabled={user.isAnonymous || isLoading}
      isLoading={isLoading}
      onPress={handleSignOut}
    >
      Sign Out
    </Btn>
  );
};

const Btn = styled(Button, undefined, (theme) => ({
  color: theme.pallette.danger,
  size: 'small' as const,
}));
