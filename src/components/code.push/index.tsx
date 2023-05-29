import * as React from 'react';
import * as Sentry from '@sentry/react-native';

import {
  Progress,
  ProgressBar,
  ProgressBarInner,
  ProgressText,
} from './styles';
import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { Button } from '../button';
import { ENV } from '@app/env';
import Lottie from 'lottie-react-native';
import { Modal } from 'react-native';
import { PageContainer } from '../page.container';
import { Result } from '../result';
import codepush from 'react-native-code-push';
import { logger } from '@app/lib/logger';
import { round } from 'lodash';
import { useAppActive } from '@app/lib/hooks/use.app.state';
import { useThrottleCallback } from '@react-hook/throttle';

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
    const deploymentKey = ENV.CODE_PUSH_DEPLOYMENT_KEY;
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
          shadow
          fullWidth
          size="large"
          onPress={() => codepush.restartApp()}
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
      visible={hasUpdate}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <PageContainer centered>
        <Result
          hero={
            <Lottie
              duration={2000}
              speed={0.5}
              resizeMode="contain"
              style={{ width: 500, aspectRatio: 1 }}
              source={{
                uri: 'https://assets10.lottiefiles.com/packages/lf20_dbdmdrse.json',
              }}
            />
          }
          title="Installing update"
          subtitle="We are continually thinking of ways to improve your experience."
          actions={[<ActionItem />]}
        />
      </PageContainer>
    </Modal>
  );
};
