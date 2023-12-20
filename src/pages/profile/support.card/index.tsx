import * as React from 'react';
import InAppReview from 'react-native-in-app-review';
import { ActivityIndicator, Pressable } from 'react-native';

import { Card } from '@app/components/card';
import { castError } from '@app/lib/cast.error';
import { useUser } from '@app/state/user/use.user';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useToast } from '@app/components/toast/use.toast';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { useRootNavigation } from '@app/navigation/use.root.navigation';

export const SupportCard: React.FC = () => {
  const toast = useToast();
  const theme = useTheme();
  const navigation = useRootNavigation();
  const user = useUser();
  const [isReviewing, setReviewing] = React.useState(false);

  function handleFeedback() {
    if (user.isAnonymous) {
      vibrate('notificationError');
      toast({
        description: 'Please sign in to provide feedback.',
        preset: 'warning',
        title: 'Sign in required!',
      });

      return;
    }

    vibrate('effectClick');
    navigation.push('Feedback');
  }

  async function handleRating() {
    vibrate('impactLight');
    setReviewing(true);
    const isAvailable = await InAppReview.isAvailable();

    if (!isAvailable) {
      setReviewing(false);
      return toast({
        preset: 'info',
        title: 'In App Review not available',
      });
    }

    try {
      await InAppReview.RequestInAppReview();
    } catch (error) {
      toast({
        description: castError(error).message,
        preset: 'error',
        title: 'Error!',
      });
    } finally {
      setReviewing(false);
    }
  }

  return (
    <Card padding="medium" title="Support">
      <Pressable disabled={isReviewing} onPress={handleRating}>
        <ListItem
          icon={
            isReviewing ? (
              <ActivityIndicator size="small" />
            ) : (
              <FaIcon name="heart" />
            )
          }
          title="Rate App"
        />
      </Pressable>
      <HorizontalDivider />
      <Pressable onPress={handleFeedback}>
        <ListItem
          extra={<FaIcon color={theme.pallette.active} name="chevron-right" />}
          icon={<FaIcon name="comment-smile" />}
          title="Provide Feedback"
        />
      </Pressable>
    </Card>
  );
};
