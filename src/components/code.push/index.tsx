import * as React from 'react';
import codepush from 'react-native-code-push';
import { Modal, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { round } from 'lodash';
import Lottie from 'lottie-react-native';
import * as Sentry from '@sentry/react-native';
import { useThrottleCallback } from '@react-hook/throttle';

import { ENV } from '@app/env';
import { logger } from '@app/lib/logger';
import { IS_IOS } from '@app/lib/platform';
import { withStyled } from '@app/lib/styled';
import { useAppActive } from '@app/lib/hooks/use.app.state';

import { Button } from '../button';
import { Result } from '../result';
import { PageContainer } from '../page.container';

export const CodepushShield: React.FC = () => {
  const [progress, setProgress] = React.useState<number>(0);
  const [hasUpdate, setHasUpdate] = React.useState(false);
  const isAppActive = useAppActive();
  const progressDerived = useDerivedValue(() => progress, [progress]);
  const progressStyle = useAnimatedStyle(() => ({
    flexGrow: withTiming(progressDerived.value, {
      duration: 100,
    }),
  }));

  const sync = useThrottleCallback(async () => {
    const deploymentKey = IS_IOS
      ? ENV.CODE_PUSH_DEPLOYMENT_KEY_IOS
      : ENV.CODE_PUSH_DEPLOYMENT_KEY_AND;

    if (deploymentKey) {
      const result = await codepush
        .checkForUpdate(deploymentKey)
        .catch((error: Error) => {
          Sentry.captureException(error);
          logger.error(error);
          return null;
        });

      if (result) {
        setHasUpdate(true);
        codepush.disallowRestart();
        const payload = await result.download((data) =>
          setProgress(round(data.receivedBytes / data.totalBytes, 2)),
        );
        await payload.install(codepush.InstallMode.ON_NEXT_RESTART);
        codepush.allowRestart();
      } else {
        logger.debug('No codepush update');
        setHasUpdate(false);
      }
    }
  }, 1000);

  const ActionItem = () => {
    if (progress === 1) {
      return (
        <Button
          fullWidth
          hasShadow
          onPress={() => codepush.restartApp()}
          size="large"
        >
          Restart now
        </Button>
      );
    } else {
      return (
        <Progress>
          <ProgressBar>
            <ProgressBarInner style={[progressStyle]} />
          </ProgressBar>
          <ProgressText>{Math.round(progress * 100)}%</ProgressText>
        </Progress>
      );
    }
  };

  React.useEffect(() => {
    if (isAppActive) {
      sync();
    }
  }, [isAppActive, sync]);

  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      visible={hasUpdate}
    >
      <PageContainer centered>
        <Result
          actions={[<ActionItem />]}
          hero={
            <Lottie
              duration={2000}
              resizeMode="contain"
              source={{
                uri: 'https://assets10.lottiefiles.com/packages/lf20_dbdmdrse.json',
              }}
              speed={0.5}
              style={{ aspectRatio: 1, width: 500 }}
            />
          }
          subtitle="We are continually thinking of ways to improve your experience."
          title="Installing update"
        />
      </PageContainer>
    </Modal>
  );
};

export const ProgressBar = withStyled(View, (theme) => [
  {
    backgroundColor: theme.pallette.grey[200],
    borderRadius: 30,
    flexDirection: 'row',
    height: 25,
    overflow: 'hidden',
    width: '100%',
  },
]);

export const ProgressBarInner = withStyled(Animated.View, (theme) => [
  {
    backgroundColor: theme.pallette.active,
  },
]);

export const Progress = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    gap: theme.space.tiny,
    width: '100%',
  },
]);

export const ProgressText = withStyled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.textSecondary,
  },
]);
