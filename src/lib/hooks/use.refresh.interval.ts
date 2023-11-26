import * as React from 'react';

import moment from 'moment';

import { logger as AppLogger } from '../logger';

export const useMinuteRefresh = () => {
  const logger = React.useMemo(
    () => AppLogger.getSubLogger('useMinuteRefresh'),
    [],
  );
  const [currentMinute, setCurrentMinute] = React.useState(
    new Date().getMinutes(),
  );

  React.useEffect(() => {
    const nextCallMs = moment
      .duration({ seconds: 60 - new Date().getSeconds() })
      .as('milliseconds');

    logger.debug(
      'Next call in %s sec',
      moment.duration(nextCallMs).as('seconds'),
    );

    const timeoutID = setTimeout(() => {
      const newMinute = new Date().getMinutes();
      if (newMinute !== currentMinute) {
        setCurrentMinute(newMinute);
        logger.debug('Minute changed! Refreshing...');
      }
    }, nextCallMs);

    // Cleanup the interval on component unmount
    return () => clearTimeout(timeoutID);
  }, [logger, currentMinute]);

  return currentMinute;
};
