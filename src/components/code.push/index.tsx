import type { LottieViewProps } from 'lottie-react-native';

import * as React from 'react';
import codepush from 'react-native-code-push';
import { Image, Modal, View } from 'react-native';
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
import { IS_IOS } from '@app/lib/platform';
import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { useLogger } from '@app/lib/logger/use.logger';
import { useAppActive } from '@app/lib/hooks/use.app.state';

import { Group } from '../group';
import { Button } from '../button';
import { Typography } from '../typography';
import { PageContainer } from '../page.container';
import { SpaceVertical } from '../space.vertical';

export const CodepushShield: React.FC = () => {
  const [shouldShowUpdate, setShouldShowUpdate] = React.useState(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [hasUpdate, setHasUpdate] = React.useState(false);
  const theme = useTheme();
  const logger = useLogger('CodepushShield');
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

    logger.debug(
      'Checking for codepush update deploymentKey=%s',
      deploymentKey,
    );

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
        setShouldShowUpdate(result.isMandatory);
        logger.debug('Found codepush update');
        codepush.disallowRestart();
        try {
          const payload = await result.download((data) => {
            const nextProgress = round(data.receivedBytes / data.totalBytes, 2);
            logger.debug('Codepush progress=%s', nextProgress);
            if (result.isMandatory) {
              setProgress(nextProgress);
            }
          });
          await payload.install(codepush.InstallMode.ON_NEXT_RESTART);
        } catch (error) {
          logger.error(error);
          Sentry.captureException(error);
        }
        codepush.allowRestart();
      } else {
        logger.debug('No codepush update');
        setHasUpdate(false);
      }
    }
  }, 1000);

  const handleRestart = () => {
    vibrate('impactHeavy');
    codepush.restartApp();
  };

  const getActionItem = () => {
    if (progress === 1) {
      return (
        <Button
          fullWidth
          hasShadow
          isSolid
          onPress={handleRestart}
          size="large"
          textStyle={{ color: theme.pallette.white }}
          type="primary"
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
          <Typography color="secondary" isBold type="small">
            {Math.round(progress * 100)}%
          </Typography>
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
      visible={hasUpdate && shouldShowUpdate}
    >
      <PageContainer centered>
        <Group direction="column" gap={'large'} padding={'large'}>
          <Group isCentered>
            <LottieAnimation source={require('./lottie.new.animation.json')} />
            <Logo
              source={
                theme.isDark
                  ? require('@app/assets/logo_white.png')
                  : require('@app/assets/logo_black.png')
              }
            />
          </Group>
          <SpaceVertical size="large" />
          <Group gap={'small'} isCentered>
            {progress === 1 ? (
              <>
                <Typography isBold isCentered type="h2">
                  Update installed
                </Typography>
                <Typography color="secondary" isBold type="p1">
                  Please restart app
                </Typography>
              </>
            ) : (
              <Typography isBold isCentered type="h2">
                Installing updates.
              </Typography>
            )}
          </Group>
          <Group>{getActionItem()}</Group>
        </Group>
      </PageContainer>
    </Modal>
  );
};

const ProgressBar = withStyled(View, (theme) => [
  {
    backgroundColor: theme.pallette.grey[200],
    borderRadius: 30,
    flexDirection: 'row',
    height: 25,
    overflow: 'hidden',
    width: '100%',
  },
]);

const ProgressBarInner = withStyled(Animated.View, (theme) => [
  {
    backgroundColor: theme.pallette.active,
  },
]);

const Progress = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    gap: theme.space.tiny,
    width: '100%',
  },
]);

const LottieAnimation = withStyled(
  Lottie,
  () => [
    {
      aspectRatio: 1,
      maxWidth: 500,
      position: 'absolute',
      width: '200%',
    },
  ],
  (theme): Partial<LottieViewProps> => ({
    autoPlay: true,
    colorFilters: [
      {
        color: theme.pallette.background,
        keypath: 'NEW_AnimOn',
      },
      {
        color: theme.pallette.background,
        keypath: 'NEW_AnimOff',
      },
      {
        color: theme.pallette.background,
        keypath: 'NEW_Loop',
      },
    ],
    duration: 2000,
    resizeMode: 'contain',
    speed: 0.5,
  }),
);

const Logo = withStyled(
  Image,
  () => [
    {
      height: '100%',
      maxHeight: 100,
      maxWidth: 100,
      width: '100%',
    },
  ],
  {
    resizeMethod: 'auto',
    resizeMode: 'contain',
  },
);
