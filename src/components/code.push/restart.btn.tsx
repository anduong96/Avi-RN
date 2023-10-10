import * as React from 'react';
import { useTimer } from 'react-timer-hook';
import codepush from 'react-native-code-push';

import moment from 'moment';

import { Button } from '../button';

export const RestartBtn: React.FC = () => {
  const time = useTimer({
    expiryTimestamp: moment().add(10, 'second').toDate(),
    onExpire: () => {
      codepush.restartApp();
    },
  });

  return (
    <Button
      fullWidth
      hasShadow
      onPress={() => codepush.restartApp()}
      size="large"
    >
      {`Restart in ${time.seconds}`}
    </Button>
  );
};
