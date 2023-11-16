import * as React from 'react';

import { useGlobalState } from '@app/state/global';

import { startup } from '.';

export function useStartup() {
  React.useEffect(() => {
    startup().finally(() => {
      useGlobalState.setState({
        _hasFinishStartup: true,
      });
    });
  }, []);
}
