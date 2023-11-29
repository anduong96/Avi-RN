import { useLogger } from '@app/lib/logger/use.logger';
import { usePreferenceQuery } from '@app/generated/server.gql';

import { useGlobalState } from '.';

export function usePreferenceSync() {
  const logger = useLogger('usePreferenceSync');

  usePreferenceQuery({
    onCompleted(data) {
      logger.debug('User Preferences=%j', data.userPreference);

      useGlobalState.setState({
        _dateFormat: data.userPreference.dateFormat,
        _measurementType: data.userPreference.measurement,
      });
    },
  });
}
