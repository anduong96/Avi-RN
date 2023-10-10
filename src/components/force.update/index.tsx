import * as React from 'react';
import { Linking, Modal } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import checkStoreVersion from 'react-native-store-version';

import { isNil } from 'lodash';
import Lottie from 'lottie-react-native';
import { useThrottleCallback } from '@react-hook/throttle';

import { ENV } from '@app/env';
import { useAppActive } from '@app/lib/hooks/use.app.state';

import { Button } from '../button';
import { Result } from '../result';
import { CodepushShield } from '../code.push';
import { PageContainer } from '../page.container';

const IOS_STORE_URL =
  'https://apps.apple.com/us/app/avi-book-flights-travel-fly/id1672456122';

export const ForceUpdateShield: React.FC = () => {
  const [hasUpdate, setHasUpdate] = React.useState<boolean>();
  const isAppActive = useAppActive();

  const checkVersion = useThrottleCallback(async () => {
    const { result } = await checkStoreVersion({
      country: 'us',
      iosStoreURL: IOS_STORE_URL,
      version: DeviceInfo.getVersion(),
    });

    setHasUpdate(result === 'new');
  }, 1000);

  React.useEffect(() => {
    if (isAppActive && ENV.APP_ENV === 'production') {
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
