import * as React from 'react';

import { Button } from '../button';
import codepush from 'react-native-code-push';
import moment from 'moment';
import { useTimer } from 'react-timer-hook';

export const RestartBtn: React.FC = () => {
  const time = useTimer({
    expiryTimestamp: moment().add(10, 'second').toDate(),
    onExpire: () => {
      codepush.restartApp();
    },
  });

  return (
    <Button shadow fullWidth size="large" onPress={() => codepush.restartApp()}>
      {`Restart in ${time.seconds}`}
    </Button>
  );
};
