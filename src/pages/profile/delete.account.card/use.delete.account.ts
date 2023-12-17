import { signOut } from '@app/lib/auth/sign.out';
import { vibrate } from '@app/lib/haptic.feedback';
import { useUser } from '@app/state/user/use.user';
import { useLogger } from '@app/lib/logger/use.logger';
import { useToast } from '@app/components/toast/use.toast';
import { usePrompt } from '@app/components/prompt/use.prompt';
import { useDeleteUserMutation } from '@app/generated/server.gql';
import { useRootNavigation } from '@app/navigation/use.root.navigation';

export function useDeleteAccount() {
  const toast = useToast();
  const prompt = usePrompt();
  const user = useUser();
  const navigation = useRootNavigation();
  const logger = useLogger('useDeleteAccount');
  const [deleteAccount] = useDeleteUserMutation();

  const handleDeleteAccount = () => {
    vibrate('effectHeavyClick');
    prompt({
      acceptStatus: 'danger',
      description: 'This action cannot be undone.',
      onAccept: async () => {
        vibrate('notificationWarning');
        logger.warn('Deleting account=%s', user.uid);

        await deleteAccount();
        toast({
          dismissType: 'touch',
          preset: 'success',
          title: 'Account deleted',
        });
        await signOut();
        navigation.navigate('Home');
      },
      onCancel: () => {
        logger.debug('Cancelled deleting account=%s', user.uid);
      },
      title: 'Are you sure?',
    });
  };

  return handleDeleteAccount;
}
