import * as React from 'react';
import { Linking, Modal } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import checkStoreVersion from 'react-native-store-version';

import { isNil } from 'lodash';
import Lottie from 'lottie-react-native';
import { useThrottleCallback } from '@react-hook/throttle';

import { ENV } from '@app/env';
import { useLogger } from '@app/lib/logger/use.logger';
import { useAppActive } from '@app/lib/hooks/use.app.state';
import { isRemoteVersionHigher } from '@app/lib/parse.semver';

import { Button } from '../button';
import { Result } from '../result';
import { CodepushShield } from '../code.push';
import { PageContainer } from '../page.container';

const IOS_STORE_URL =
  'https://apps.apple.com/us/app/avi-flight-tracker/id6457441009';

export const ForceUpdateShield: React.FC = () => {
  const logger = useLogger('ForceUpdateShield');
  const [hasUpdate, setHasUpdate] = React.useState<boolean>();
  const isAppActive = useAppActive();

  const checkVersion = useThrottleCallback(async () => {
    logger.debug('Checking for store version');
    if (!ENV.IS_PROD) {
      setHasUpdate(false);
      return;
    }

    try {
      const { local, remote, result } = await checkStoreVersion({
        country: 'us',
        iosStoreURL: IOS_STORE_URL,
        version: DeviceInfo.getVersion(),
      });

      const hasNextUpdate = isRemoteVersionHigher(remote, local);

      logger.debug(
        'Found store version result=%s hasNextUpdate=%s remote=%s local=%s',
        result,
        hasNextUpdate,
        remote,
        local,
      );

      setHasUpdate(hasNextUpdate);
    } catch (error) {
      logger.error(error);
      setHasUpdate(false);
    }
  }, 1000);

  React.useEffect(() => {
    if (isAppActive) {
      checkVersion();
    }
  }, [isAppActive, checkVersion]);

  if (!isNil(hasUpdate) && !hasUpdate) {
    return <CodepushShield />;
  }

  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      visible={hasUpdate ?? false}
    >
      <PageContainer centered>
        <Result
          actions={[
            <Button
              fullWidth
              hasShadow
              onPress={() => Linking.openURL(IOS_STORE_URL)}
              size="large"
            >
              Update now
            </Button>,
          ]}
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
          subtitle="New features important features available to improve your experience"
          title="Its time to update"
        />
      </PageContainer>
    </Modal>
  );
};
