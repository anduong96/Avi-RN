import * as React from 'react';

import { Linking, Modal } from 'react-native';

import { Button } from '../button';
import { CodepushShield } from '../code.push';
import DeviceInfo from 'react-native-device-info';
import { ENV } from '@app/env';
import Lottie from 'lottie-react-native';
import { PageContainer } from '../page.container';
import { Result } from '../result';
import checkStoreVersion from 'react-native-store-version';
import { isNil } from 'lodash';
import { useAppActive } from '@app/lib/hooks/use.app.state';
import { useThrottleCallback } from '@react-hook/throttle';

const IOS_STORE_URL =
  'https://apps.apple.com/us/app/avi-book-flights-travel-fly/id1672456122';

export const ForceUpdateShield: React.FC = () => {
  const [hasUpdate, setHasUpdate] = React.useState<boolean>();
  const isAppActive = useAppActive();

  const checkVersion = useThrottleCallback(async () => {
    const { result } = await checkStoreVersion({
      version: DeviceInfo.getVersion(),
      iosStoreURL: IOS_STORE_URL,
      country: 'us',
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
      visible={hasUpdate ?? false}
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
          title="Its time to update"
          subtitle="New features important features available to improve your experience"
          actions={[
            <Button
              shadow
              fullWidth
              size="large"
              onPress={() => Linking.openURL(IOS_STORE_URL)}
            >
              Update now
            </Button>,
          ]}
        />
      </PageContainer>
    </Modal>
  );
};
